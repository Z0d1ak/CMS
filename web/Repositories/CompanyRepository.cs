using System;
using System.ComponentModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Contracts.SearchParameters.SortingColumns;
using web.Db;
using web.Entities;
using web.Other;
using web.Repositories.Helpers;
using web.Services;

namespace web.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        #region Private Fields

        private readonly DataContext dataContext;
        private readonly IPasswordService passwordService;

        #endregion

        #region Constructor

        public CompanyRepository(
            DataContext dataContext,
            IPasswordService passwordService)
        {
            this.dataContext = dataContext;
            this.passwordService = passwordService;
        }

        #endregion

        #region Public Methods

        public async Task<ServiceResult<ResponseCompanyDto>> CreateAsync(CreateCompanyDto createCompanyDto, CancellationToken cancellationToken = default)
        {
            await using var transaction = await this.dataContext.Database.BeginTransactionAsync(cancellationToken);
            try
            {
                var company = new Company()
                {
                    Id = createCompanyDto.Company.Id,
                    Name = createCompanyDto.Company.Name
                };
                this.dataContext.Companies.Add(company);

                var adminRole = new Role
                {
                    Id = Guid.NewGuid(),
                    Name = RoleType.CompanyAdmin.ToString(),
                    Type = RoleType.CompanyAdmin,
                    CompanyId = company.Id
                };
                var correctorRole = new Role
                {
                    Id = Guid.NewGuid(),
                    Name = RoleType.Corrector.ToString(),
                    Type = RoleType.Corrector,
                    CompanyId = company.Id
                };
                var authorRole = new Role
                {
                    Id = Guid.NewGuid(),
                    Name = RoleType.Author.ToString(),
                    Type = RoleType.Author,
                    CompanyId = company.Id
                };
                var redactorRole = new Role
                {
                    Id = Guid.NewGuid(),
                    Name = RoleType.Redactor.ToString(),
                    Type = RoleType.Redactor,
                    CompanyId = company.Id
                };
                var chiefRedactorRole = new Role
                {
                    Id = Guid.NewGuid(),
                    Name = RoleType.ChiefRedactor.ToString(),
                    Type = RoleType.ChiefRedactor,
                    CompanyId = company.Id
                };

                this.dataContext.Roles.AddRange(
                    adminRole,
                    correctorRole,
                    authorRole,
                    redactorRole,
                    chiefRedactorRole
                    );

                var user = new User()
                {
                    Id = createCompanyDto.Admin.Id,
                    Email = createCompanyDto.Admin.Email,
                    FirstName = createCompanyDto.Admin.FirstName,
                    CompanyId = company.Id
                };
                (user.PasswordHash, user.PasswordSalt) = 
                    await this.passwordService.CreatePasswordHashAsync(createCompanyDto.Admin.Password, cancellationToken);

                user.Roles.Add(adminRole);
                this.dataContext.Users.Add(user);

                await this.dataContext.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);

                return new ServiceResult<ResponseCompanyDto>(company.ToResponseDto());
            }
            catch (DbUpdateException)
            {
                return new ServiceResult<ResponseCompanyDto>(StatusCodes.Status409Conflict);
            }
        }

        public async Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            try
            {
                var company = new Company()
                {
                    Id = id
                };

                this.dataContext.Entry(company).State = EntityState.Deleted;

                var changes = await this.dataContext.SaveChangesAsync(cancellationToken);

                if (changes == 0)
                {
                    return new ServiceResult(StatusCodes.Status404NotFound);
                }
                return ServiceResult.Successfull;
            }
            catch (DbUpdateException)
            {
                return new ServiceResult(StatusCodes.Status404NotFound);
            }
        }

        public async Task<ServiceResult<SearchResponseDto<ResponseCompanyDto>>> FindAsync(CompanySearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            var selectQuery = this.dataContext.Companies
                .AsNoTracking();

            if(searchParameters.QuickSearch != null)
            {
                selectQuery = selectQuery.Where(x => x.Name.StartsWith(searchParameters.QuickSearch));
            }
            else
            {
                selectQuery = selectQuery.Where(x =>
                    (searchParameters.NameStartsWith == null || x.Name.StartsWith(searchParameters.NameStartsWith)));
            }

            if(searchParameters.SortingColumn is not null)
            {
                switch (searchParameters.SortDirection)
                {
                    case ListSortDirection.Ascending:
                        switch (searchParameters.SortingColumn)
                        {
                            case CompanySortingColumn.Name:
                                selectQuery = selectQuery.OrderBy(x => x.Name);
                                break;
                        }
                        break;
                    case ListSortDirection.Descending:
                        switch (searchParameters.SortingColumn)
                        {
                            case CompanySortingColumn.Name:
                                selectQuery = selectQuery.OrderByDescending(x => x.Name);
                                break;
                        }
                        break;
                }
            }

            selectQuery = selectQuery
                .Skip((searchParameters.PageNumber - 1) * searchParameters.PageLimit)
                .Take(searchParameters.PageLimit);

            var companies = await selectQuery
                .Select(Converters.ToResponseCompanyDtoExpression)
                .ToListAsync(cancellationToken);
            var count = await selectQuery.CountAsync(cancellationToken);
            var searchResponse = new SearchResponseDto<ResponseCompanyDto>(count, companies);
            return new ServiceResult<SearchResponseDto<ResponseCompanyDto>>(searchResponse);
        }

        public async ValueTask<ServiceResult<ResponseCompanyDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var company = await this.dataContext.Companies.FindAsync(new object[] { id }, cancellationToken);
            if(company is null)
            {
                return new ServiceResult<ResponseCompanyDto>(StatusCodes.Status404NotFound);
            }
            return new ServiceResult<ResponseCompanyDto>(company.ToResponseDto());
        }

        public async Task<ServiceResult> UpdateAsync(StoreCompanyDto companyDto, CancellationToken cancellationToken = default)
        {
            var company = new Company
            {
                Id = companyDto.Id,
                Name = companyDto.Name
            };

            try
            {
                this.dataContext.Attach(company);
                this.dataContext.Entry(company).Property(x => x.Name).IsModified = true;

                var changes = await this.dataContext.SaveChangesAsync(cancellationToken);

                if (changes == 0)
                {
                    return new ServiceResult(StatusCodes.Status404NotFound);
                }
                return ServiceResult.Successfull;
            }
            catch(DbUpdateException)
            {
                return new ServiceResult(StatusCodes.Status404NotFound);
            }
        }

        #endregion
    }
}

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
        private readonly ISqlExceptionConverter sqlExceptionConverter;

        #endregion

        #region Constructor

        public CompanyRepository(
            DataContext dataContext,
            IPasswordService passwordService,
            ISqlExceptionConverter sqlExceptionConverter)
        {
            this.dataContext = dataContext;
            this.passwordService = passwordService;
            this.sqlExceptionConverter = sqlExceptionConverter;
        }

        #endregion

        #region Public Methods

        public async Task<ServiceResult<ResponseCompanyDto>> CreateAsync(CreateCompanyDto createCompanyDto, CancellationToken cancellationToken = default)
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

            try
            {
                await this.dataContext.SaveChangesAsync(cancellationToken);
                return new ServiceResult<ResponseCompanyDto>(company.ToResponseDto());
            }
            catch (DbUpdateException dbUpdateException)
            {
                var errorCode = this.sqlExceptionConverter.Convert(dbUpdateException);
                if(errorCode is null)
                {
                    throw;
                }
                return new ServiceResult<ResponseCompanyDto>(errorCode.Value);
            }
        }

        public async Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var company = new Company()
            {
                Id = id
            };
            this.dataContext.Entry(company).State = EntityState.Deleted;

            try
            {
                await this.dataContext.SaveChangesAsync(cancellationToken);
                return ServiceResult.Successfull;
            }
            catch (DbUpdateException dbUpdateException)
            {
                var errorCode = this.sqlExceptionConverter.Convert(dbUpdateException);
                if (errorCode is null)
                {
                    throw;
                }
                return new ServiceResult(errorCode.Value);
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
                .Select(Mappers.ToResponseCompanyDtoExpression)
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
            this.dataContext.Attach(company);
            this.dataContext.Entry(company).Property(x => x.Name).IsModified = true;

            try
            {
                await this.dataContext.SaveChangesAsync(cancellationToken);
                return ServiceResult.Successfull;
            }
            catch(DbUpdateException dbUpdateException)
            {
                var errorCode = this.sqlExceptionConverter.Convert(dbUpdateException);
                if (errorCode is null)
                {
                    throw;
                }
                return new ServiceResult(errorCode.Value);
            }
        }

        #endregion
    }
}

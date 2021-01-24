using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using web.Db;
using web.Dto;
using web.Entities;
using web.Other.SearchParameters;

namespace web.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly DataContext dataContext;

        public CompanyRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<CompanyDto?> CreateAsync(CreateCompanyDto createCompanyDto, CancellationToken cancellationToken = default)
        {
            await using var transaction = await this.dataContext.Database.BeginTransactionAsync(cancellationToken);
            try
            {
                var company = new Company()
                {
                    Id = createCompanyDto.Id,
                    Name = createCompanyDto.Name
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
                    Name = RoleType.Сorrector.ToString(),
                    Type = RoleType.Сorrector,
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

                using var hmac = new HMACSHA512();
                var user = new User()
                {
                    Id = createCompanyDto.Admin.Id,
                    Email = createCompanyDto.Admin.Email,
                    FirstName = createCompanyDto.Admin.FirstName,
                    CompanyId = company.Id,
                    PasswordSalt = hmac.Key,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(createCompanyDto.Admin.Password))
                };

                user.Roles.Add(adminRole);
                this.dataContext.Users.Add(user);

                await this.dataContext.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);

                return company.ToDto();
            }
            catch (DbUpdateException e)
            {
                return null;
            }
        }

        public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var company = new Company()
            {
                Id = id
            };

            this.dataContext.Entry(company).State = EntityState.Deleted;

            var changes = await this.dataContext.SaveChangesAsync(cancellationToken);

            if(changes == 0)
            {
                return false;
            }
            return true;
        }

        public async Task<IEnumerable<CompanyDto>> FindAsync(CompanySearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            var companies = await this.dataContext.Companies
                .Where(x =>
                   (searchParameters.StartsWith == null || x.Name.StartsWith(searchParameters.StartsWith)))
                .ToListAsync(cancellationToken);
            return companies.Select(x => x.ToDto());
        }

        public async ValueTask<CompanyDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var company = await this.dataContext.Companies.FindAsync(new object[] { id }, cancellationToken);
            return company.ToDto();
        }

        public async Task<bool> UpdateAsync(CompanyDto companyDto, CancellationToken cancellationToken = default)
        {
            var company = companyDto.ToEntity();

            this.dataContext.Attach(company);
            this.dataContext.Entry(company).Property(x => x.Name).IsModified = true;

            var changes = await this.dataContext.SaveChangesAsync(cancellationToken);

            if (changes == 0)
            {
                return false;
            }
            return true;
        }
    }
}

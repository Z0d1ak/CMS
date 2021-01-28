using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using web.Dto;
using web.Other.SearchParameters;

namespace web.Repositories
{
    public interface ICompanyRepository
    {
        Task<CompanyDto?> CreateAsync(CreateCompanyDto companyDto, CancellationToken cancellationToken = default);

        ValueTask<CompanyDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<SearchResponseDto<CompanyDto>> FindAsync(CompanySearchParameters searchParameters, CancellationToken cancellationToken = default);

        Task<bool> UpdateAsync(CompanyDto companyDto, CancellationToken cancellationToken = default);

        Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}

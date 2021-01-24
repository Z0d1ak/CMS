using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using web.Dto;
using web.Other;
using web.Other.SearchParameters;

namespace web.Services
{
    public interface ICompanyService
    {
        Task<ServiceResult<CompanyDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<ServiceResult<IEnumerable<CompanyDto>>> FindAsync(CompanySearchParameters searchParameters, CancellationToken cancellationToken = default);

        Task<ServiceResult<CompanyDto>> CreateAsync(CreateCompanyDto companyDto, CancellationToken cancellationToken = default);

        Task<ServiceResult> UpdateAsync(CompanyDto companyDto, CancellationToken cancellationToken = default);

        Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}

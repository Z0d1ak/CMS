using System;
using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Other;

namespace web.Repositories
{
    public interface ICompanyRepository
    {
        Task<ServiceResult<ResponseCompanyDto>> CreateAsync(CreateCompanyDto companyDto, CancellationToken cancellationToken = default);

        ValueTask<ServiceResult<ResponseCompanyDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<ServiceResult<SearchResponseDto<ResponseCompanyDto>>> FindAsync(CompanySearchParameters searchParameters, CancellationToken cancellationToken = default);

        Task<ServiceResult> UpdateAsync(StoreCompanyDto companyDto, CancellationToken cancellationToken = default);

        Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}

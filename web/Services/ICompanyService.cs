using System;
using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Other;

namespace web.Services
{
    public interface ICompanyService
    {
        Task<ServiceResult<ResponseCompanyDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<ServiceResult<SearchResponseDto<ResponseCompanyDto>>> FindAsync(CompanySearchParameters searchParameters, CancellationToken cancellationToken = default);

        Task<ServiceResult<ResponseCompanyDto>> CreateAsync(CreateCompanyDto createCompanyDto, CancellationToken cancellationToken = default);

        Task<ServiceResult> UpdateAsync(StoreCompanyDto storeCompanyDto, CancellationToken cancellationToken = default);

        Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}

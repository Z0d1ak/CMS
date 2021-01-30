using System;
using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;

namespace web.Repositories
{
    public interface ICompanyRepository
    {
        Task<ResponseCompanyDto?> CreateAsync(CreateCompanyDto companyDto, CancellationToken cancellationToken = default);

        ValueTask<ResponseCompanyDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<SearchResponseDto<ResponseCompanyDto>> FindAsync(CompanySearchParameters searchParameters, CancellationToken cancellationToken = default);

        Task<bool> UpdateAsync(StoreCompanyDto companyDto, CancellationToken cancellationToken = default);

        Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}

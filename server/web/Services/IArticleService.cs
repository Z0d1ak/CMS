using System;
using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Other;

namespace web.Services
{
    public interface IArticleService
    {
        Task<ServiceResult<ResponseArticleDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<ServiceResult<SearchResponseDto<ResponseArticleInfoDto>>> FindAsync(ArticleSearchParameters searchParameters, CancellationToken cancellationToken = default);

        Task<ServiceResult<ResponseArticleDto>> CreateAsync(StoreArticleDto storeArticleDto, CancellationToken cancellationToken = default);

        Task<ServiceResult> UpdateAsync(StoreArticleDto storeArticleDto, CancellationToken cancellationToken = default);

        Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}

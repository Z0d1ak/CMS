using System;
using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Other;

namespace web.Repositories
{
    public interface IArticleRepository
    {
        Task<ServiceResult<ResponseArticleDto>> CreateAsync(StoreArticleDto storeArticleDto, CancellationToken cancellationToken);

        Task<ServiceResult<SearchResponseDto<ResponseArticleInfoDto>>> FindAsync(ArticleSearchParameters articleSearchParameters, CancellationToken cancellationToken);

        Task<ServiceResult<ResponseArticleDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken);

        Task<ServiceResult> UpdateAsync(StoreArticleDto storeArticleDto, CancellationToken cancellationToken);

        Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken);
    }
}

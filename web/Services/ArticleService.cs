using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Options;
using web.Other;
using web.Repositories;

namespace web.Services
{
    public class ArticleService
        : IArticleService
    {
        private readonly IArticleRepository articleRepository;
        private readonly IUserInfoProvider userInfoProvider;

        public ArticleService(
            IArticleRepository articleRepository,
            IUserInfoProvider userInfoProvider)
        {
            this.articleRepository = articleRepository;
            this.userInfoProvider = userInfoProvider;
        }


        public async Task<ServiceResult<ResponseArticleDto>> CreateAsync(StoreArticleDto storeArticleDto, CancellationToken cancellationToken = default)
        {
            if(!this.userInfoProvider.User.IsInRole(AccessRoles.ChiefRedactor)
                && !this.userInfoProvider.User.IsInRole(AccessRoles.Author))
            {
                return new ServiceResult<ResponseArticleDto>(StatusCodes.Status403Forbidden);
            }

            return await this.articleRepository.CreateAsync(storeArticleDto, cancellationToken);
        }

        public async Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            if (!this.userInfoProvider.User.IsInRole(AccessRoles.ChiefRedactor))
            {
                return new ServiceResult(StatusCodes.Status403Forbidden);
            }
            return await this.articleRepository.DeleteAsync(id, cancellationToken);
        }

        public async Task<ServiceResult<SearchResponseDto<ResponseArticleInfoDto>>> FindAsync(ArticleSearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            // TODO МБ какая-то валидация.
            return await this.articleRepository.FindAsync(searchParameters, cancellationToken);
        }

        public async Task<ServiceResult<ResponseArticleDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await this.articleRepository.GetByIdAsync(id, cancellationToken);
        }

        public async Task<ServiceResult> UpdateAsync(StoreArticleDto storeArticleDto, CancellationToken cancellationToken = default)
        {
            // TODO Проверить, что статья в состоянии проект и изменяет автор или задание назначено на текущего сотрудника.
            return await this.articleRepository.UpdateAsync(storeArticleDto, cancellationToken);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Db;
using web.Entities;
using web.Other;
using web.Services;

namespace web.Repositories
{
    public class ArticleRepository
        : IArticleRepository
    {
        private readonly DataContext dataContext;
        private readonly IUserInfoProvider userInfoProvider;

        public ArticleRepository(
            DataContext dataContext,
            IUserInfoProvider userInfoProvider)
        {
            this.dataContext = dataContext;
            this.userInfoProvider = userInfoProvider;
        }

        public Task<ServiceResult<ResponseArticleDto>> CreateAsync(StoreArticleDto storeArticleDto, CancellationToken cancellationToken)
        {
            var article = new Article()
            {
                Id = storeArticleDto.Id,
                CompanyId = this.userInfoProvider.CompanyId,
                Title = storeArticleDto.Title,
                Content = storeArticleDto.Content,
                InitiatorId = this.userInfoProvider.UserId,
                CreationDate = DateTime.Now,
                State = ArticleState.Project
            };
            throw new NotImplementedException();

        }

        public Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResult<SearchResponseDto<ResponseArticleInfoDto>>> FindAsync(ArticleSearchParameters articleSearchParameters, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResult<ResponseArticleDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResult> UpdateAsync(StoreArticleDto storeArticleDto, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}

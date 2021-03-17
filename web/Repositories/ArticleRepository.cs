using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Db;
using web.Entities;
using web.Other;
using web.Repositories.Helpers;
using web.Services;

namespace web.Repositories
{
    public class ArticleRepository
        : IArticleRepository
    {
        private readonly DataContext dataContext;
        private readonly IUserInfoProvider userInfoProvider;
        private readonly ISqlExceptionConverter sqlExceptionConverter;

        public ArticleRepository(
            DataContext dataContext,
            IUserInfoProvider userInfoProvider,
            ISqlExceptionConverter sqlExceptionConverter)
        {
            this.dataContext = dataContext;
            this.userInfoProvider = userInfoProvider;
            this.sqlExceptionConverter = sqlExceptionConverter;
        }

        public async Task<ServiceResult<ResponseArticleDto>> CreateAsync(StoreArticleDto storeArticleDto, CancellationToken cancellationToken)
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

            try
            {
                await this.dataContext.SaveChangesAsync(cancellationToken);
                return new ServiceResult<ResponseArticleDto>(article.ToResponseDto());
            }
            catch (DbUpdateException dbUpdateException)
            {
                var errorCode = this.sqlExceptionConverter.Convert(dbUpdateException);
                if (errorCode is null)
                {
                    throw;
                }
                return new ServiceResult<ResponseArticleDto>(errorCode.Value);
            }
        }

        public async Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var user = new Article()
            {
                Id = id
            };
            this.dataContext.Entry(user).State = EntityState.Deleted;

            try
            {
                await this.dataContext.SaveChangesAsync(cancellationToken);
                return ServiceResult.Successfull;
            }
            catch (DbUpdateException dbUpdateException)
            {
                var errorCode = this.sqlExceptionConverter.Convert(dbUpdateException);
                if (errorCode is null)
                {
                    throw;
                }
                return new ServiceResult(errorCode.Value);
            }
        }

        public Task<ServiceResult<SearchResponseDto<ResponseArticleInfoDto>>> FindAsync(ArticleSearchParameters articleSearchParameters, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult<ResponseArticleDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var article = await this.dataContext.Articles
                    .Include(x => x.Tasks).ThenInclude(x => x.Performer)
                    .Include(x => x.Tasks).ThenInclude(x => x.Author)
                    .Include(x => x.Initiator)
                    .Where(x => x.Id == id)
                    .Select(Mappers.ToResponseArticleDtoExpression)
                    .FirstOrDefaultAsync(cancellationToken);

            if (article is null)
            {
                return new ServiceResult<ResponseArticleDto>(StatusCodes.Status404NotFound);
            }
            return new ServiceResult<ResponseArticleDto>(article);
        }

        public async Task<ServiceResult> UpdateAsync(StoreArticleDto storeArticleDto, CancellationToken cancellationToken)
        {
            var article = await this.dataContext.Articles.FirstOrDefaultAsync(x => x.Id == storeArticleDto.Id, cancellationToken);
            if(article is null)
            {
                return new ServiceResult(StatusCodes.Status404NotFound);
            }

            if(!(article.State == ArticleState.Project
                && article.InitiatorId == this.userInfoProvider.UserId))
            {
                var activeTask = await this.dataContext.Tasks.FirstOrDefaultAsync(x => x.ArticleId == article.Id, cancellationToken);
                if(activeTask.PerformerId != this.userInfoProvider.UserId)
                {
                    return new ServiceResult(StatusCodes.Status403Forbidden);
                }
            }

            article.Content = storeArticleDto.Content;
            article.Title = storeArticleDto.Title;

            await this.dataContext.SaveChangesAsync(cancellationToken);

            return ServiceResult.Successfull;
        }
    }
}

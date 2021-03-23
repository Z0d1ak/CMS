using System;
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

            this.dataContext.Articles.Add(article);

            try
            {
                await this.dataContext.SaveChangesAsync(cancellationToken);
                return await this.GetByIdAsync(article.Id, cancellationToken);
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

        public async Task<ServiceResult<SearchResponseDto<ResponseArticleInfoDto>>> FindAsync(ArticleSearchParameters searchParameters, CancellationToken cancellationToken)
        {
            var dbArticles = await this.dataContext.Articles
                    .Include(x => x.Tasks).ThenInclude(x => x.Performer)
                    .Include(x => x.Tasks).ThenInclude(x => x.Author)
                    .Include(x => x.Initiator)
                    .ToListAsync(cancellationToken);
            var articles = dbArticles.Select(article =>
            new ResponseArticleInfoDto
            {
                Id = article.Id,
                Initiator = article.Initiator.ToResponseDto(),
                CreationDate = article.CreationDate,
                State = article.State,
                Title = article.Title,
                Task = article.Tasks.FirstOrDefault(x => x.СompletionDate == null)?.ToResponseDto(),
            });

            var isAuthor = this.userInfoProvider.User.IsInRole(RoleType.Author.ToString());
            var isChiefRedactor = this.userInfoProvider.User.IsInRole(RoleType.ChiefRedactor.ToString());
            var isCorrector = this.userInfoProvider.User.IsInRole(RoleType.Corrector.ToString());
            var isRedactor = this.userInfoProvider.User.IsInRole(RoleType.Redactor.ToString());
            articles = articles.Where(x => x.Task == null || x.Task.Performer == null || x.Task.Performer.Id == this.userInfoProvider.UserId);

            articles = articles.Where(x =>
                (isAuthor
                    && x.Task == null && x.Initiator.Id == this.userInfoProvider.UserId)
                || (isAuthor
                    && x.Task != null && (x.Task.Type == TaskType.Write || x.Task.Type == TaskType.ValidateCorrect || x.Task.Type == TaskType.ValidateRedact))
                || (isCorrector
                    && x.Task != null && x.Task.Type == TaskType.Correct)
                || (isRedactor
                    && x.Task != null && x.Task.Type == TaskType.Redact)
                || (isChiefRedactor
                    && x.Task == null && x.Initiator.Id == this.userInfoProvider.UserId)
                || (isChiefRedactor
                    && x.Task != null && (x.Task.Type == TaskType.Approve || x.Task.Type == TaskType.Redact))
                );
            var count = articles.Count();

            articles = articles.Where(x =>
                (searchParameters.Assignee == null || searchParameters.Assignee == x.Task?.Performer?.Id)
                && (searchParameters.Author == null || searchParameters.Author == x.Initiator.Id)
                && (searchParameters.NameContains == null || x.Title.Contains(searchParameters.NameContains))
                && (searchParameters.State == null || searchParameters.State == x.State)
                && (searchParameters.TaskType == null || searchParameters.TaskType == x.Task?.Type)
                );
            var resp = articles
                .Skip((searchParameters.PageNumber - 1) * searchParameters.PageLimit)
                .Take(searchParameters.PageLimit);


            var searchResponse = new SearchResponseDto<ResponseArticleInfoDto>(count, articles);
            return new ServiceResult<SearchResponseDto<ResponseArticleInfoDto>>(searchResponse);
        }

      

        public async Task<ServiceResult<ResponseArticleDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var dbArticle = await this.dataContext.Articles
                    .Include(x => x.Tasks).ThenInclude(x => x.Performer)
                    .Include(x => x.Tasks).ThenInclude(x => x.Author)
                    .Include(x => x.Initiator)
                    .Where(x => x.Id == id)
                    .FirstOrDefaultAsync(cancellationToken);
            var article = new ResponseArticleDto
            {
                Id = dbArticle.Id,
                Initiator = dbArticle.Initiator.ToResponseDto(),
                CreationDate = dbArticle.CreationDate,
                State = dbArticle.State,
                Title = dbArticle.Title,
                Content = dbArticle.Content,
                Tasks = dbArticle.Tasks.Select(x => x.ToResponseDto())
            };

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

using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using web.Contracts.Dto.Request;
using web.Db;
using web.Entities;
using web.Other;

namespace web.Services
{
    public class WfService : IWfService
    {
        public WfService(
            DataContext dataContext,
            IUserInfoProvider userInfoProvider)
        {
            DataContext = dataContext;
            UserInfoProvider = userInfoProvider;
        }

        public DataContext DataContext { get; }
        public IUserInfoProvider UserInfoProvider { get; }

        public async Task<ServiceResult> CreateTaskAsync(CreateTaskDto createTaskDto, CancellationToken cancellationToken)
        {
            var task = new WfTask
            {
                Id = createTaskDto.Id,
                CompanyId = this.UserInfoProvider.CompanyId,
                ArticleId = createTaskDto.ArticleId,
                AuthorId = this.UserInfoProvider.UserId,
                CreationDate = DateTime.Now,
                Type = createTaskDto.TaskType,
                Description = createTaskDto.Description
            };
            this.DataContext.Tasks.Add(task);
            await this.DataContext.SaveChangesAsync(cancellationToken);

            // Проверить, что пользователь может создать такое задание.
            // Кейс 1: Автор инициирует статью
            // Кейс 2: Редактор назначает 
            return ServiceResult.Successfull;
        }

        public async Task<ServiceResult> FinishTaskAsync(FinishTaskDto finishTaskDto, CancellationToken cancellationToken)
        {
            var task = this.DataContext.Tasks.First(x => x.Id == finishTaskDto.Id);
            if(task.СompletionDate is not null
                || task.AssignmentDate is null)
            {
                return new ServiceResult(StatusCodes.Status400BadRequest);
            }

            var article = this.DataContext.Articles.First(x => x.Id == task.ArticleId);


            task.СompletionDate = DateTime.Now;
            task.Comment = finishTaskDto.Comment;
            task.Content = article.Content;

            this.DataContext.Update(task);

            var nextType = GetNextType(task.Type);
            if(nextType is not null)
            {
                var userId = (task.Type == TaskType.ValidateCorrect || task.Type == TaskType.ValidateRedact)
                    ? task.PerformerId
                    : null;

                var nextTask = new WfTask
                {
                    Id = Guid.NewGuid(),
                    CompanyId = this.UserInfoProvider.CompanyId,
                    ArticleId = task.ArticleId,
                    AuthorId = this.UserInfoProvider.UserId,
                    CreationDate = DateTime.Now,
                    Type = nextType.Value,
                    Description = null,
                    PerformerId = userId,
                    ParentTaskId = task.Id
                };
                this.DataContext.Tasks.Add(nextTask);
            }

            await DataContext.SaveChangesAsync(cancellationToken);

            return ServiceResult.Successfull;

        }

        private TaskType? GetNextType(TaskType type)
        {
            switch (type)
            {
                case TaskType.Approve:
                    return TaskType.Write;
                case TaskType.Write:
                    return TaskType.Redact;
                case TaskType.Redact:
                    return TaskType.ValidateRedact;
                case TaskType.ValidateRedact:
                    return TaskType.Correct;
                case TaskType.Correct:
                    return TaskType.ValidateCorrect;
                case TaskType.ValidateCorrect:
                    return null;
            }
            return null;
        }

        public async Task<ServiceResult> TakeInWorkAsync(Guid taskId, CancellationToken cancellationToken)
        {
            var task = this.DataContext.Tasks.First(x => x.Id == taskId);
            if(task.PerformerId is null)
            {
                task.PerformerId = this.UserInfoProvider.UserId;
            }
            task.AssignmentDate = DateTime.Now;
            DataContext.Tasks.Update(task);
            await this.DataContext.SaveChangesAsync(cancellationToken);
            return ServiceResult.Successfull;
        }
    }
}

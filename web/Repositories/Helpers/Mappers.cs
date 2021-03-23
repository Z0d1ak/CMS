using System;
using System.Linq;
using System.Linq.Expressions;
using LinqKit;
using web.Contracts.Dto.Response;
using web.Entities;

namespace web.Repositories.Helpers
{
    public static class Mappers
    {
        public static Expression<Func<User, ResponseUserDto>> ToResponseUserDtoExpression = user =>
            new ResponseUserDto
            {
                Id = user.Id,
                CompanyId = user.CompanyId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Roles = user.Roles.Select(r => r.Type)
            };

        public static Expression<Func<Company, ResponseCompanyDto>> ToResponseCompanyDtoExpression = company =>
            new ResponseCompanyDto
            {
                Id = company.Id,
                Name = company.Name
            };

        public static Expression<Func<Role, ResponseRoleDto>> ToResponseRoleDtoExpression = role =>
            new ResponseRoleDto
            {
                Id = role.Id,
                Name = role.Name,
                Type = role.Type
            };

        public static Expression<Func<Article, ResponseArticleDto>> ToResponseArticleDtoExpression = dbArticle =>
            new ResponseArticleDto
            {
                Id = dbArticle.Id,
                Initiator = ToResponseUserDtoExpression.Invoke(dbArticle.Initiator),
                CreationDate = dbArticle.CreationDate,
                State = dbArticle.State,
                Title = dbArticle.Title,
                Content = dbArticle.Content,
                Tasks = dbArticle.Tasks.Select(x => ToResponseTaskDtoExpression.Invoke(x))
            };  

        public static Expression<Func<WfTask, ResponseTaskDto>> ToResponseTaskDtoExpression => task =>
            new ResponseTaskDto
            {
                Id = task.Id,
                Type = task.Type,
                Performer = task.Performer == null ? null : ToResponseUserDtoExpression.Invoke(task.Performer),
                Author = ToResponseUserDtoExpression.Invoke(task.Author),
                CreationDate = task.CreationDate,
                AssignmentDate = task.AssignmentDate,
                СompletionDate = task.СompletionDate,
                Comment = task.Comment,
                Description = task.Description
            };

        private static readonly Func<User, ResponseUserDto> ToResponseUserDtoCompiled = ToResponseUserDtoExpression.Compile();

        private static readonly Func<Company, ResponseCompanyDto> ToResponseCompanyDtoCompiled = ToResponseCompanyDtoExpression.Compile();

        private static readonly Func<Role, ResponseRoleDto> ToResponseRoleDtoCompiled = ToResponseRoleDtoExpression.Compile();

        private static readonly Func<WfTask, ResponseTaskDto> ToResponseTaskDtoCompiled = ToResponseTaskDtoExpression.Compile();

        private static readonly Func<Article, ResponseArticleDto> ToResponseAticleDtoCompiled = ToResponseArticleDtoExpression.Compile();

        public static ResponseUserDto ToResponseDto(this User user) =>
            ToResponseUserDtoCompiled(user);

        public static ResponseCompanyDto ToResponseDto(this Company company) =>
            ToResponseCompanyDtoCompiled(company);

        public static ResponseRoleDto ToResponseDto(this Role role) =>
            ToResponseRoleDtoCompiled(role);
        public static ResponseTaskDto ToResponseDto(this WfTask task) =>
            ToResponseTaskDtoCompiled(task);
        //public static ResponseArticleDto ToResponseDto(this Article article) =>
        //    ToResponseAticleDtoCompiled(article);

    }   
}

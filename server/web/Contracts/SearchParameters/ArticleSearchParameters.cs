using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web;
using web.Contracts.SearchParameters.SortingColumns;
using web.Entities;

namespace web.Contracts.SearchParameters
{
    public class ArticleSearchParameters
        : DefaultSearchParameters
    {
        /// <summary>
        /// Название статьи содержит...
        /// </summary>
        [MaxLength(32)]
        public string? NameContains { get; set; }

        /// <summary>
        /// Тип задания.
        /// </summary>
        public TaskType? TaskType { get; set; }

        /// <summary>
        /// Сотрудник, на которого наначено задание.
        /// </summary>
        public Guid? Assignee { get; set; }

        /// <summary>
        /// Автор задания.
        /// </summary>
        public Guid? Author { get; set; }

        /// <summary>
        /// Роль, на которую назначено задание.
        /// </summary>
        public RoleType? Role { get; set; }

        /// <summary>
        /// Состояние задания.
        /// </summary>
        public ArticleState? State { get; set; }
        
        /// <summary>
        /// Колонка для сортировки.
        /// </summary>
        public ArticleSortingColumn? SortingColumn { get; set; }

    }
}

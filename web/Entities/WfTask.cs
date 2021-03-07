using System;

#nullable disable

namespace web.Entities
{
    /// <summary>
    /// Объект, описывающий сущность задания.
    /// </summary>
    public class WfTask
    {
        public Guid Id { get; set; }

        public Guid CompanyId { get; set; }
        public Company Company { get; set; }

        public Guid ArticleId { get; set; }
        public Article Article { get; set; }

        public Guid AuthorId { get; set; }
        public User Author { get; set; }

        public Guid? PerformerId { get; set; }
        public User Performer { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime? AssignmentDate { get; set; }

        public DateTime? СompletionDate { get; set; }

        public string Description { get; set; }

        public string Comment { get; set; }

        public TaskType Type { get; set; }

        /// <summary>
        /// Контент статьи при заврешении задания.
        /// </summary>
        public string Content { get; set; }
    }
}

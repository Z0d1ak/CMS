using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Entities
{
    /// <summary>
    /// Завершенное задание.
    /// </summary>
    public class CompletedTask
    {
        public Guid Id { get; set; }

        public Guid CompanyID { get; set; }

        public Company Company { get; set; }

        public Guid ParentTaskID { get; set; }

        public ActiveTask ParentTask { get; set; }

        public Guid ArticleID { get; set; }

        public Article Article { get; set; }

        public Guid AuthorId { get; set; }

        public User Author { get; set; }

        public Guid PerformerId { get; set; }

        public User Performer { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime EndDate { get; set; }

        public string TaskDescription { get; set; }

        public string Comment { get; set; }

        public TaskType TaskType { get; set; }

        /// <summary>
        /// Контент статьи при заврешении заддания.
        /// </summary>
        public string Content { get; set; }
    }
}

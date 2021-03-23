using System;
using System.Collections.Generic;

namespace web.Entities
{
    #nullable disable

    /// <summary>
    /// Объект, описывающий сущность статьи.
    /// </summary>
    public class Article
    {
        public Guid Id { get; set; }

        public Guid InitiatorId { get; set; }
        public User Initiator { get; set; }

        public Guid CompanyId { get; set; }
        public Company Company { get; set; }

        public DateTime CreationDate { get; set; }

        public ArticleState State { get; set; }

        public string Title { get; set; }

        public string? Content { get; set; }

        public ICollection<WfTask> Tasks { get; set; }
    }
}

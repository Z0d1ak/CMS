using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace web.Entities
{
    public class Article
    {
        public Guid Id { get; set; }

        public Guid InitiatorID { get; set; }
        public User Initiator { get; set; }

        public Guid CompanyID { get; set; }
        public Company Company { get; set; }

        public DateTime CreationDate { get; set; }

        public ArticleState State { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public ICollection<WfTask> Tasks { get; set; }
    }
}

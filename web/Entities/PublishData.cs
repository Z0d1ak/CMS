using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Entities
{
    public class PublishData
    {
        public Guid Id { get; set; }

        public Guid CompanyId { get; set; }
        public Company Company { get; set; }

        public Guid ArticleId {get; set;}

        public DateTime? Date { get; set; }

        public bool Published { get; set; }

        public string Link { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace web.Entities
{
    /// <summary>
    /// Компания.
    /// </summary>
    public sealed class Company
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public ICollection<User> Users { get; set; }

        public ICollection<Article> Articles { get; set; }

        public ICollection<WfTask> Tasks { get; set; }


        public ICollection<Role> Roles { get; set; }

    }
}

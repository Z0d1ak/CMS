using System;
using System.Collections.Generic;

namespace web.Entities
{
    /// <summary>
    /// Объект, описывающий сущность компании.
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

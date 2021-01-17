using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace web.Entities
{
    /// <summary>
    /// Роль рользователя в системе.
    /// </summary>
    public sealed class Role
    {
        public Guid Id { get; set; }

        public Guid CompanyID { get; set; }
        public Company Company { get; set; }

        public RoleType Type { get; set; }

        public string Name { get; set; }

        public ICollection<User> Users { get; set; }
    }
}

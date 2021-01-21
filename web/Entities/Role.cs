using System;
using System.Collections.Generic;

namespace web.Entities
{
    /// <summary>
    /// Объект, описывающий сущность роли пользователя в системе.
    /// </summary>
    public sealed class Role
    {
        public Guid Id { get; set; }

        public Guid CompanyId { get; set; }
        public Company Company { get; set; }

        public RoleType Type { get; set; }

        public string Name { get; set; }

        public ICollection<User> Users { get; set; } = new List<User>();
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace web.Entities
{
    /// <summary>
    /// Объект, описывающий сущность пользователя в системе.
    /// </summary>
    public sealed class User
    {
        public Guid Id { get; set; }

        public Guid CompanyId { get; set; }
        public Company Company { get; set; }

        public string Login { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public ICollection<Role> Roles { get; set; }

        public ICollection<Article> InitiatedArticles { get; set; }

        public ICollection<WfTask> CreatedTasks { get; set; }

        public ICollection<WfTask> PerfomingTasks { get; set; }
    }
}

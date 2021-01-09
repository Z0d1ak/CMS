using System;
using System.Collections.Generic;

namespace web.Entities
{
    /// <summary>
    /// Пользователь системы.
    /// </summary>
    public sealed class User
    {
        public Guid Id { get; set; }

        public Guid CompanyID { get; set; }

        public Company Company { get; set; }

        public ICollection<Role> Roles { get; set; }

        public string Login { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
    }
}

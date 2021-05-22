using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using web.Entities;

namespace web.Options
{
    public static class AccessRoles
    {
        public const string SuperAdmin = nameof(RoleType.SuperAdmin);

        public const string CompanyAdmin = nameof(RoleType.CompanyAdmin);

        public const string Redactor = nameof(RoleType.Redactor);

        public const string ChiefRedactor = nameof(RoleType.ChiefRedactor);

        public const string Сorrector = nameof(RoleType.Corrector);
         
        public const string Author = nameof(RoleType.Author);

        public const string AnyAdmin = SuperAdmin + "," + CompanyAdmin;

        public const string AnyRedactor = ChiefRedactor + "," + Redactor;

        public const string AnyEmployee = CompanyAdmin + "," + Redactor + "," + ChiefRedactor + "," + Сorrector + "," + Author + ",";
    }
}

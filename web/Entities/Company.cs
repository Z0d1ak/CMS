using System;
using System.Collections.Generic;
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
    }
}

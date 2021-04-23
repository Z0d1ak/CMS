using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Entities
{
    public sealed class Data
    {
        public Guid Id { get; set; }

        public string Extension { get; set; } = null!;
    }
}

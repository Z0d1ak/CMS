using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Options
{
    public class SwaggerConfig
    {
        public const string Swagger = "Swagger";

        public string? Title { get; set; }

        public string? Description { get; set; }

        public string? AuthDescription { get; set; }

        public string? Version { get; set; }
    }
}

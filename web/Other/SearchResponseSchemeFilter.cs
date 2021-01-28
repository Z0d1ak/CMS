using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using web.Dto;
using Pluralize.NET.Core;

namespace web.Other
{
    public class SearchResponseSchemeFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            if (!context.Type.IsGenericType || !context.Type.GetGenericTypeDefinition().IsAssignableFrom(typeof(SearchResponseDto<>)))
            {
                return;
            }

            var keyType = context.Type.GetGenericArguments()[0];
            var entityName = new Pluralizer().Pluralize(keyType.Name[0..^3]);
            schema.Title = entityName + "SearchResponseDto";
        }
    }

}

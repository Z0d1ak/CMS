using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using web.Dto;
using Pluralize.NET.Core;
using web.Dto.Request;
using web.Dto.Response;

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

            var keyType = context.Type.GetGenericArguments()[0].Name;
            if (keyType.EndsWith("Dto"))
            {
                keyType = keyType[0..^3];
            }
            if (keyType.StartsWith("Response"))
            {
                keyType = keyType[8..];
            }

            var entityName = new Pluralizer().Pluralize(keyType);
            schema.Title = entityName + "SearchResponseDto";
        }
    }

}

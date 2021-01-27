using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace web.Other.SearchParameters
{
    public class RoleSearchParameters
        : DefaultSearchParameters
    {
        /// <summary>
        /// Название роли начинается с...
        /// </summary>
        [MaxLength(32)]
        public string? NameStartsWith { get; set; }

        public override void ToParametersList(List<string> parameters)
        {
            if (this.NameStartsWith is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.NameStartsWith))}={HttpUtility.UrlEncode(this.NameStartsWith)}");
            }
        }
    }
}

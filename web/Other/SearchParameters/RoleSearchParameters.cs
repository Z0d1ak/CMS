using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace web.Other.SearchParameters
{
    public class RoleSearchParameters
        : ISearchParameter
    {
        /// <summary>
        /// Название роли начинается с...
        /// </summary>
        [MaxLength(32)]
        public string? StartsWith { get; set; }

        public string ToUrlParameter()
        {
            var parameters = new List<string>();
            if (this.StartsWith is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.StartsWith))}={HttpUtility.UrlEncode(this.StartsWith)}");
            }

            if (parameters.Count == 0)
            {
                return string.Empty;
            }

            return '?' + string.Join("&", parameters);
        }
    }
}

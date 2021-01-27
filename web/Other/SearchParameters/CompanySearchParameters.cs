using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace web.Other.SearchParameters
{
    public class CompanySearchParameters
        : DefaultSearchParameters
    {
        /// <summary>
        /// Название компании начинается с...
        /// </summary>
        [MaxLength(32)]
        public string? NameStartsWith { get; set; }

        public override void ToParametersList(List<string> parameters)
        {
            base.ToParametersList(parameters);

            if (this.NameStartsWith is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.NameStartsWith))}={HttpUtility.UrlEncode(this.NameStartsWith)}");
            }
        }
    }
}

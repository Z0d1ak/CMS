using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web;
using web.Contracts.SearchParameters.SortingColumns;

namespace web.Contracts.SearchParameters
{
    public class RoleSearchParameters
        : DefaultSearchParameters
    {
        /// <summary>
        /// Название роли начинается с...
        /// </summary>
        [MaxLength(32)]
        public string? NameStartsWith { get; set; }

        /// <summary>
        /// Имя колонки для сортировки.
        /// </summary>
        [MaxLength(32)]
        public RoleSortingColumn? SortingColumn { get; set; }

        /// <summary>
        /// Направление сортировки.
        /// </summary>
        public ListSortDirection? SortDirection { get; set; }

        public override void ToParametersList(List<string> parameters)
        {
            if (this.NameStartsWith is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.NameStartsWith))}={HttpUtility.UrlEncode(this.NameStartsWith)}");
            }
            if (this.SortingColumn is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.SortingColumn))}={HttpUtility.UrlEncode(this.SortingColumn.ToString())}");
            }
            if (this.SortDirection is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.SortDirection))}={HttpUtility.UrlEncode(this.SortDirection.ToString())}");
            }
        }
    }
}

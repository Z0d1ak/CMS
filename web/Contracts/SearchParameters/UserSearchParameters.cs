using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web;
using web.Contracts.SearchParameters.SortingColumns;
using web.Entities;

namespace web.Contracts.SearchParameters
{
    public class UserSearchParameters
        : DefaultSearchParameters
    {
        /// <summary>
        /// Email пользователя наинается с...
        /// </summary>
        [MaxLength(32)]
        public string? EmailStartsWith { get; set; }

        /// <summary>
        /// Имя пользователя начинается с...
        /// </summary>
        [MaxLength(32)]
        public string? NameStartsWith { get; set; }

        /// <summary>
        /// Пользователь входит в роль.
        /// </summary>
        public RoleType? Role { get; set; }

        /// <summary>
        /// Имя колонки для сортировки.
        /// </summary>
        [MaxLength(32)]
        public UserSortingColumn? SortingColumn { get; set; }

        /// <summary>
        /// Направление сортировки.
        /// </summary>
        public ListSortDirection? SortDirection { get; set; }

        public override void ToParametersList(List<string> parameters)
        {
            base.ToParametersList(parameters);

            if (this.EmailStartsWith is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.EmailStartsWith))}={HttpUtility.UrlEncode(this.EmailStartsWith)}");
            }
            if (this.NameStartsWith is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.NameStartsWith))}={HttpUtility.UrlEncode(this.NameStartsWith)}");
            }
            if (this.Role is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.Role))}={HttpUtility.UrlEncode(this.Role.ToString())}");
            }
            if (this.SortingColumn is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.SortingColumn))}={HttpUtility.UrlEncode(this.SortingColumn.ToString())}");
            }
        }
    }
}

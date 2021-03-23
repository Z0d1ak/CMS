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
        public string? FirstNameStartsWith { get; set; }

        /// <summary>
        /// Фамилия пользователя начинается с...
        /// </summary>
        [MaxLength(32)]
        public string? LastNameStartsWith { get; set; }

        /// <summary>
        /// Пользователь входит в роль.
        /// </summary>
        public RoleType? Role { get; set; }

        /// <summary>
        /// Имя колонки для сортировки.
        /// </summary>
        public UserSortingColumn? SortingColumn { get; set; }

        /// <summary>
        /// Направление сортировки.  По умолчанию сортирует по возрастанию.
        /// </summary>
        public ListSortDirection SortDirection { get; set; }

        public override void ToParametersList(List<string> parameters)
        {
            base.ToParametersList(parameters);

            if (this.EmailStartsWith is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.EmailStartsWith))}={HttpUtility.UrlEncode(this.EmailStartsWith)}");
            }
            if (this.FirstNameStartsWith is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.FirstNameStartsWith))}={HttpUtility.UrlEncode(this.FirstNameStartsWith)}");
            }
            if (this.LastNameStartsWith is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.LastNameStartsWith))}={HttpUtility.UrlEncode(this.LastNameStartsWith)}");
            }
            if (this.Role is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.Role))}={HttpUtility.UrlEncode(this.Role.ToString())}");
            }
            if (this.SortingColumn is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.SortingColumn))}={HttpUtility.UrlEncode(this.SortingColumn.ToString())}");
            }
            if (this.SortDirection != default)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.SortDirection))}={HttpUtility.UrlEncode(this.SortDirection.ToString())}");
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Web;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using web.Entities;

namespace web.Other.SearchParameters
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
        }
    }
}

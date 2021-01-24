﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace web.Other.SearchParameters
{
    public class UserSearchParameters : ISearchParameter
    {
        [MaxLength(32)]
        public string? EmailStartsWith { get; set; }

        [MaxLength(32)]
        public string? NameStartsWith { get; set; }

        public Guid? Role { get; set; }

        public string ToUrlParameter()
        {
            var parameters = new List<string>();
            if(this.EmailStartsWith is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.EmailStartsWith))}={HttpUtility.UrlEncode(this.EmailStartsWith)}");
            }
            if (this.NameStartsWith is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.NameStartsWith))}={HttpUtility.UrlEncode(this.NameStartsWith)}");
            }
            if (this.Role is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.Role))}={HttpUtility.UrlEncode(this.Role.Value.ToString())}");
            }

            if(parameters.Count == 0)
            {
                return string.Empty;
            }

            return '?' + string.Join("&", parameters);
        }
    }
}

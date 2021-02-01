using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace web.Contracts.SearchParameters
{
    public abstract class DefaultSearchParameters
        : ISearchParameter
    {
        private int pageLimit = 20;

        private int pageNumber = 1;

        /// <summary>
        /// Быстрый поиск.
        /// </summary>
        [MaxLength(32)]
        public string? QuickSearch { get; set; }

        /// <summary>
        /// Количество элементов на станице. По умолчанию 20.
        /// </summary>
        public int PageLimit
        {
            get
            {
                return pageLimit;
            }
            set
            {
                pageLimit = value;
            }
        }

        /// <summary>
        /// Номер страницы. По умолчанию 1.
        /// </summary>
        public int PageNumber
        {
            get
            {
                return pageNumber;
            }
            set
            {
                pageNumber = value;
            }
        }

        public virtual void ToParametersList(List<string> parameters)
        {
            if (this.QuickSearch is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.QuickSearch))}={HttpUtility.UrlEncode(QuickSearch)}");
            }

            if (this.PageLimit != 20)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.PageLimit))}={this.PageLimit}");
            }

            if (this.PageNumber != 1)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.PageNumber))}={this.PageNumber}");
            }
        }
    }
}

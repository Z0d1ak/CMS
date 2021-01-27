using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace web.Other.SearchParameters
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
        public int? PageLimit
        {
            get
            {
                return this.pageLimit;
            }
            set
            {
                if(value is not null)
                {
                    this.pageLimit = value.Value;
                }
            }
        }

        /// <summary>
        /// Номер страницы. По умолчанию 1.
        /// </summary>
        public int? PageNumber
        {
            get
            {
                return this.pageNumber;
            }
            set
            {
                if (value is not null)
                {
                    this.pageNumber = value.Value;
                }
            }
        }

        /// <summary>
        /// Имя колонки для сортировки.
        /// </summary>
        public string? SortColumn { get; set; }

        /// <summary>
        /// Направление сортировки.
        /// 0 - ASC, 1 - DESC.
        /// </summary>
        public ListSortDirection? SortDirection { get; set; }

        public virtual void ToParametersList(List<string> parameters)
        {
            if (this.QuickSearch is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.QuickSearch))}={HttpUtility.UrlEncode(this.QuickSearch)}");
            }

            if (this.PageLimit != 20)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.PageLimit))}={this.PageLimit!.Value}");
            }

            if (this.PageNumber != 1)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.PageNumber))}={this.PageNumber!.Value}");
            }

            if (this.SortColumn is not null)
            {
                parameters.Add($"{HttpUtility.UrlEncode(nameof(this.SortColumn))}={HttpUtility.UrlEncode(this.SortColumn)}");
            }
        }
    }
}

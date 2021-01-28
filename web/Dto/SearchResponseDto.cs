using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace web.Dto
{
    public class SearchResponseDto<TItem>
    {
        public SearchResponseDto(int count, IEnumerable<TItem> items)
        {
            this.Count = count;
            this.Items = items;
        }

        [Required]
        public int Count { get; set; }

        [Required]
        public IEnumerable<TItem> Items { get; set; }
    }
}

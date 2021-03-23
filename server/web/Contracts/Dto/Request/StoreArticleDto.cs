using System;
using System.ComponentModel.DataAnnotations;

namespace web.Contracts.Dto.Request
{
    /// <summary>
    /// Контракт данных для создания статьи.
    /// </summary>
    public class StoreArticleDto
    {
        /// <summary>
        /// ID статьи.
        /// </summary>
        [Required]
        [Key]
        public Guid Id { get; set; }

        /// <summary>
        /// Заголовок статьи.
        /// </summary>
        [Required]
        [MaxLength(256)]
        public string Title { get; set; } = null!;

        /// <summary>
        /// Контент статьи.
        /// </summary>
        public string? Content { get; set; } = null!;
    }
}

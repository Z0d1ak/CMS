using System;
using System.ComponentModel.DataAnnotations;

namespace web.Contracts.Dto.Request
{
    /// <summary>
    /// Контракт данных для получения информации о компании.
    /// </summary>
    public class StoreCompanyDto
    {
        /// <summary>
        /// Уникальный идентификатор.
        /// </summary>
        [Key]
        [Required]
        public Guid Id { get; set; }

        /// <summary>
        /// Название.
        /// </summary>
        [Required]
        [MinLength(1)]
        [MaxLength(64)]
        public string Name { get; set; } = null!;
    }
}

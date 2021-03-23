using System;
using System.ComponentModel.DataAnnotations;

namespace web.Contracts.Dto.Request
{
    /// <summary>
    /// Контракт данных для сохранения инфрмации о роли.
    /// </summary>
    public class StoreRoleDto
    {
        /// <summary>
        /// Уникальный идентификатор.
        /// </summary>
        [Required]
        [Key]
        public Guid Id { get; set; }

        /// <summary>
        /// Название.
        /// </summary>
        [Required]
        [MinLength(4)]
        [MaxLength(32)]
        public string Name { get; set; } = null!;
    }
}

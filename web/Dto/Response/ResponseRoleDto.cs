using System;
using System.ComponentModel.DataAnnotations;
using web.Entities;

namespace web.Dto.Response
{
    /// <summary>
    /// Контракт данных для получения информации о роли.
    /// </summary>
    public class ResponseRoleDto
    {
        /// <summary>
        /// Уникальный идентификатор.
        /// </summary>
        [Required]
        [Key]
        public Guid Id { get; set; }

        /// <summary>
        /// Тип роли.
        /// </summary>
        [Required]
        public RoleType Type { get; set; }

        /// <summary>
        /// Название.
        /// </summary>
        [Required]
        [MinLength(4)]
        [MaxLength(32)]
        public string Name { get; set; } = null!;
    }
}

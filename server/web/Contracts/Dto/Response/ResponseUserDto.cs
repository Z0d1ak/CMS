using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using web.Entities;

namespace web.Contracts.Dto.Response
{
    /// <summary>
    /// Контракт данных для получения информации о пользователе.
    /// </summary>
    public class ResponseUserDto
    {
        /// <summary>
        /// Уникальный идентификатор.
        /// </summary>
        [Key]
        [Required]
        public Guid Id { get; set; }

        /// <summary>
        /// Идентификатор компании пользователя.
        /// </summary>
        [Required]
        public Guid CompanyId { get; set; }

        /// <summary>
        /// Email адрес.
        /// </summary>
        [EmailAddress]
        [Required]
        [MaxLength(32)]
        public string Email { get; set; } = null!;

        /// <summary>
        /// Имя.
        /// </summary>
        [Required]
        [MinLength(1)]
        [MaxLength(32)]
        public string FirstName { get; set; } = null!;

        /// <summary>
        /// Фамилия.
        /// </summary>
        [MaxLength(32)]
        public string? LastName { get; set; }

        /// <summary>
        /// Список ролей, в которые входит пользователь.
        /// </summary>
        [MaxLength(5)]
        [Required]
        public IEnumerable<RoleType> Roles { get; set; } = null!;
    }
}

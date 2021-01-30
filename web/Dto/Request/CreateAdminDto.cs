using System;
using System.ComponentModel.DataAnnotations;

namespace web.Dto.Request
{
    /// <summary>
    /// Контракт данных дял создания адмиситратора компании.
    /// </summary>
    public class CreateAdminDto
    {
        /// <summary>
        /// Уникальный идентификатор.
        /// </summary>
        [Key]
        [Required]
        public Guid Id { get; set; }

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
        /// Пароль.
        /// </summary>
        [Required]
        [MinLength(8)]
        [MaxLength(32)]
        public string Password { get; set; } = null!;
    }
}

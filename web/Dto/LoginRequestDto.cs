using System.ComponentModel.DataAnnotations;

namespace web.Dto
{
    /// <summary>
    /// Контракт данных для авторизации пользователя.
    /// </summary>
    public class LoginRequestDto
    {
        /// <summary>
        /// Email пользователя.
        /// </summary>
        [Required]
        [MaxLength(32)]
        [EmailAddress]
        public string Email { get; set; } = null!;

        /// <summary>
        /// Пароль пользвателя.
        /// </summary>
        [Required]
        [MinLength(8)]
        [MaxLength(32)]
        public string Password {get; set;} = null!;
    }
}

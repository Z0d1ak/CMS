using System.ComponentModel.DataAnnotations;

namespace web.Dto.Response
{
    /// <summary>
    /// Контракт данных для ответа сервера при успешной авторизации пользователя.
    /// </summary>
    public class LoginResponseDto
    {
        /// <summary>
        /// Информация о пользователе.
        /// </summary>
        [Required]
        public ResponseUserDto User { get; set; } = null!;

        /// <summary>
        /// JWT токен.
        /// </summary>
        [Required]
        public string SecurityToken { get; set; } = null!;
    }
}

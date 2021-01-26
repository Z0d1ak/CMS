using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace web.Dto
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
        public UserDto User { get; set; } = null!;

        /// <summary>
        /// JWT токен.
        /// </summary>
        [Required]
        public string SecurityToken { get; set; } = null!;
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace web.Dto
{
    public class LoginResponseDto
    {
        [Required]
        public UserDto User { get; set; } = null!;

        [Required]
        public string SecurityToken { get; set; } = null!;
    }
}

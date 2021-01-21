using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace web.Dto
{
    public class LoginResponseDto
    {
        public UserDto User { get; set; }

        public string SecurityToken { get; set; }
    }
}

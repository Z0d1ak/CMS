using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace web.Dto
{
    public class StoreUserDto : UserDto
    {
        [MinLength(8)]
        [MaxLength(32)]
        public string? Password { get; set; }
    }
}

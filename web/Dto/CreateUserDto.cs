using System.ComponentModel.DataAnnotations;

namespace web.Dto
{
    public class CreateUserDto : UserDto
    {
        [MinLength(8)]
        [MaxLength(32)]
        public string Password { get; set; } = null!;
    }
}

using System.ComponentModel.DataAnnotations;

namespace web.Dto
{
    public class LoginRequestDto
    {
        [Required]
        [MaxLength(32)]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [MinLength(8)]
        [MaxLength(32)]
        public string Password {get; set;} = null!;
    }
}

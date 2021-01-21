using System.ComponentModel.DataAnnotations;

namespace web.Dto
{
    public class LoginRequestDto
    {
        [Required]
        [StringLength(32)]
        [EmailAddress]
        public string Email {get; set;}

        [Required]
        [StringLength(32, MinimumLength = 8)]
        public string Password {get; set;}
    }
}

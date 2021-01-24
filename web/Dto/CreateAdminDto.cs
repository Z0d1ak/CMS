using System;
using System.ComponentModel.DataAnnotations;

namespace web.Dto
{
    public class CreateAdminDto
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [EmailAddress]
        [Required]
        [MaxLength(32)]
        public string Email { get; set; } = null!;

        [Required]
        [MaxLength(32)]
        public string FirstName { get; set; } = null!;

        [MaxLength(32)]
        public string LastName { get; set; } = null!;
        
        [Required]
        [MinLength(8)]
        [MaxLength(32)]
        public string Password { get; set; } = null!;
    }
}

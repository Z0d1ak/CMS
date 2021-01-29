using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using web.Entities;

namespace web.Dto
{
    public class UserDto
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


        [MaxLength(5)]
        public IEnumerable<RoleType>? Roles { get; set; }
    }
}

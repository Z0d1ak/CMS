using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using web.Entities;
using System.ComponentModel.DataAnnotations;

namespace web.Dto
{
    public class RoleDto
    {
        [Required]
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Type { get; set; } = null!;

        [Required]
        [MinLength(4)]
        [MaxLength(32)]
        public string Name { get; set; } = null!;
    }
}

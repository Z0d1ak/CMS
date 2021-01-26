﻿using System;
using System.ComponentModel.DataAnnotations;
using web.Entities;

namespace web.Dto
{
    /// <summary>
    /// Контракт данных для обмена информацией о компании.
    /// </summary>
    public class CompanyDto
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(64)]
        public string Name { get; set; } = null!;
    }
}

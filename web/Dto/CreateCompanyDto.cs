using System.ComponentModel.DataAnnotations;

namespace web.Dto
{
    public class CreateCompanyDto
    {
        [Required]
        public CompanyDto Company { get; set; } = null!;

        [Required]
        public CreateAdminDto Admin { get; set; } = null!;
    }
}

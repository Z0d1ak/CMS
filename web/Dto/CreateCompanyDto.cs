using System.ComponentModel.DataAnnotations;

namespace web.Dto
{
    public class CreateCompanyDto : CompanyDto
    {
        [Required]
        public CreateAdminDto Admin { get; set; } = null!;
    }
}

using System.ComponentModel.DataAnnotations;

namespace web.Dto.Request
{
    /// <summary>
    /// Контракт данных для создания компании.
    /// Содержит данные создаваемой компании
    /// и данные администратора создаваемой компании.
    /// </summary>
    public class CreateCompanyDto
    {
        /// <summary>
        /// Данные для создания компании.
        /// </summary>
        [Required]
        public StoreCompanyDto Company { get; set; } = null!;

        /// <summary>
        /// Данные для создания администратора компании.
        /// </summary>
        [Required]
        public CreateAdminDto Admin { get; set; } = null!;
    }
}

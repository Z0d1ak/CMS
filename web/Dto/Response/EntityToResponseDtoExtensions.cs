using System.Linq;
using web.Entities;

namespace web.Dto.Response
{
    public static class EntityToResponseDtoExtensions
    {
        public static ResponseCompanyDto ToDto(this Company entity)
        {
            return new ResponseCompanyDto
            {
                Id = entity.Id,
                Name = entity.Name
            };
        }

        public static ResponseUserDto ToDto(this User entity)
        {
            return new ResponseUserDto
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                Roles = entity.Roles.Select(x => x.Type)
            };
        }

        public static ResponseRoleDto ToDto(this Role role)
        {
            return new ResponseRoleDto
            {
                Id = role.Id,
                Name = role.Name,
                Type = role.Type
            };
        }
    }
}

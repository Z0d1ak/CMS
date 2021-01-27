using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using web.Entities;

namespace web.Dto
{
    public static class EntityDtoConverterExtensions
    {
        public static Company ToEntity(this CompanyDto dto)
        {
            return new Company
            {
                Id = dto.Id,
                Name = dto.Name
            };
        }

        public static CompanyDto ToDto(this Company entity)
        {
            return new CompanyDto
            {
                Id = entity.Id,
                Name = entity.Name
            };
        }

        public static UserDto ToDto(this User entity)
        {
            return new UserDto
            {
                Id = entity.Id,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                Roles = entity.Roles.Select(x => x.Type.ToString())
            };
        }

        public static RoleDto ToDto(this Role role)
        {
            return new RoleDto
            {
                Id = role.Id,
                Name = role.Name,
                Type = role.Type.ToString()
            };
        }
    }
}

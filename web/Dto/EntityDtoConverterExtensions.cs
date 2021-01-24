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

        public static User ToEntity(this UserDto dto)
        {
            return new User
            {
                Id = dto.Id,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Roles = dto.Roles?.Select(x => new Role { Id = x }).ToList()
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
                Roles = entity.Roles.Select(x => x.Id)
            };
        }
    }
}

using System;
using System.Linq;
using System.Linq.Expressions;
using web.Contracts.Dto.Response;
using web.Entities;

namespace web.Repositories.Helpers
{
    public static class Mappers
    {
        public static Expression<Func<User, ResponseUserDto>> ToResponseUserDtoExpression { get; } = user =>
            new ResponseUserDto
            {
                Id = user.Id,
                CompanyId = user.CompanyId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Roles = user.Roles.Select(r => r.Type)
            };

        public static Expression<Func<Company, ResponseCompanyDto>> ToResponseCompanyDtoExpression { get; } = company =>
            new ResponseCompanyDto
            {
                Id = company.Id,
                Name = company.Name
            };

        public static Expression<Func<Role, ResponseRoleDto>> ToResponseRoleDtoExpression { get; } = role =>
            new ResponseRoleDto
            {
                Id = role.Id,
                Name = role.Name,
                Type = role.Type
            };


        private static readonly Func<User, ResponseUserDto> ToResponseUserDtoCompiled = ToResponseUserDtoExpression.Compile();

        private static readonly Func<Company, ResponseCompanyDto> ToResponseCompanyDtoCompiled = ToResponseCompanyDtoExpression.Compile();

        private static readonly Func<Role, ResponseRoleDto> ToResponseRoleDtoCompiled = ToResponseRoleDtoExpression.Compile();
        

        public static ResponseUserDto ToResponseDto(this User user) =>
            ToResponseUserDtoCompiled(user);

        public static ResponseCompanyDto ToResponseDto(this Company company) =>
            ToResponseCompanyDtoCompiled(company);

        public static ResponseRoleDto ToResponseDto(this Role role) =>
            ToResponseRoleDtoCompiled(role);
        
    }   
}

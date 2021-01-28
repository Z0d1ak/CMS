using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using web.Dto;

namespace Tests.Helpers
{
    public static class DefaultDtos
    {
        public static readonly LoginRequestDto SuperAdminLoginDto = new LoginRequestDto
        {
            Email = "admin@admin.com",
            Password = "Master1234"
        };

        public static readonly CompanyDto Company1 = new CompanyDto
        {
            Id = Guid.NewGuid(),
            Name = "company1"
        };

        public static readonly CreateCompanyDto CreateCompany1Dto = new CreateCompanyDto
        {
            Company = Company1,
            Admin = new CreateAdminDto
            {
                Id = Guid.NewGuid(),
                Email = "admin1@admin.com",
                FirstName = "admin1",
                LastName = "admin1",
                Password = "Master1234"
            }
        };

        public static readonly LoginRequestDto Admin1LoginDto = new LoginRequestDto
        {
            Email = "admin1@admin.com",
            Password = "Master1234"
        };

        public static readonly CreateUserDto CreateUser1Dto = new CreateUserDto
        {
            Id = Guid.NewGuid(),
            Email = "user1@user.com",
            FirstName = "user1",
            LastName = "user1",
            Password = "Master1234"
        };

        public static readonly UserDto User1 = new UserDto
        {
            Id = CreateUser1Dto.Id,
            Email = "user1@user.com",
            FirstName = "user1",
            LastName = "user1"
        };

        public static readonly CreateUserDto CreateUser2Dto = new CreateUserDto
        {
            Id = Guid.NewGuid(),
            Email = "user2@user.com",
            FirstName = "user2",
            LastName = "user2",
            Password = "Master1234"
        };

        public static readonly UserDto User2 = new UserDto
        {
            Id = CreateUser2Dto.Id,
            Email = "user2@user.com",
            FirstName = "user2",
            LastName = "user2"
        };

        public static readonly CreateUserDto CreateUser3Dto = new CreateUserDto
        {
            Id = Guid.NewGuid(),
            Email = "user3@user.com",
            FirstName = "user3",
            LastName = "user3",
            Password = "Master1234"
        };

        public static readonly UserDto User3 = new UserDto
        {
            Id = CreateUser3Dto.Id,
            Email = "user3@user.com",
            FirstName = "user3",
            LastName = "user3"
        };
    }
}

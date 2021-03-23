using System;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;

namespace Tests.Helpers
{
    public static class DefaultDtos
    {
        public static readonly LoginRequestDto SuperAdminLoginDto = new LoginRequestDto
        {
            Email = "admin@admin.com",
            Password = "Master1234"
        };

        #region Company1

        public static readonly Guid Company1Id = Guid.NewGuid();
        public static readonly Guid Company1AdminId = Guid.NewGuid();

        public static readonly ResponseCompanyDto ResponseCompany1Dto = new ResponseCompanyDto
        {
            Id = Company1Id,
            Name = "Company1"
        };

        public static readonly StoreCompanyDto StoreCompany1Dto = new StoreCompanyDto
        {
            Id = Company1Id,
            Name = "Company1"
        };

        public static readonly CreateCompanyDto CreateCompany1Dto = new CreateCompanyDto
        {
            Company = StoreCompany1Dto,
            Admin = new CreateAdminDto
            {
                Id = Company1AdminId,
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

        #endregion

        #region Users

        public static readonly Guid User1Id = Guid.NewGuid();
        public static readonly CreateUserDto CreateUser1Dto = new CreateUserDto
        {
            Id = User1Id,
            Email = "user1@user.com",
            FirstName = "user1",
            LastName = "user1",
            Password = "Master1234"
        };
        public static readonly ResponseUserDto ResponseUser1Dto = new ResponseUserDto
        {
            Id = User1Id,
            Email = "user1@user.com",
            FirstName = "user1",
            LastName = "user1"
        };
        public static readonly StoreUserDto StoreUser1Dto = new StoreUserDto
        {
            Id = User1Id,
            Email = "user1@user.com",
            FirstName = "user1",
            LastName = "user1",
            Password = "Master1234"
        };



        public static readonly Guid User2Id = Guid.NewGuid();
        public static readonly CreateUserDto CreateUser2Dto = new CreateUserDto
        {
            Id = User2Id,
            Email = "user2@user.com",
            FirstName = "user2",
            LastName = "user2",
            Password = "Master1234"
        };
        public static readonly ResponseUserDto ResponseUser2Dto = new ResponseUserDto
        {
            Id = User2Id,
            Email = "user2@user.com",
            FirstName = "user2",
            LastName = "user2"
        };
        public static readonly StoreUserDto StoreUser2Dto = new StoreUserDto
        {
            Id = User2Id,
            Email = "user2@user.com",
            FirstName = "user2",
            LastName = "user2",
            Password = "Master1234"
        };



        public static readonly Guid User3Id = Guid.NewGuid();
        public static readonly CreateUserDto CreateUser3Dto = new CreateUserDto
        {
            Id = User3Id,
            Email = "user3@user.com",
            FirstName = "user3",
            LastName = "user3",
            Password = "Master1234"
        };
        public static readonly ResponseUserDto ResponseUser3Dto = new ResponseUserDto
        {
            Id = User3Id,
            Email = "user3@user.com",
            FirstName = "user3",
            LastName = "user3",
        };
        public static readonly StoreUserDto StoreUser3Dto = new StoreUserDto
        {
            Id = User3Id,
            Email = "user3@user.com",
            FirstName = "user3",
            LastName = "user3",
            Password = "Master1234"
        };

        #endregion

    }
}
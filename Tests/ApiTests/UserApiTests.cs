using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NUnit.Framework;
using Tests.Helpers;
using web.Dto;
using web.Entities;

namespace Tests.ApiTests
{
    [TestFixture]
    public sealed class UserApiTests
        : ApiTestBase
    {
        [OneTimeSetUp]
        public override async Task OneTimeSetUpAsync()
        {
            await base.OneTimeSetUpAsync();

            using(await this.AuthAsync(DefaultDtos.SuperAdminLoginDto))
            {
                var company1Response = await this.PostAsync<CreateCompanyDto, CompanyDto>("api/company", DefaultDtos.CreateCompany1Dto);
                Assert.AreEqual(StatusCodes.Status201Created, company1Response.StatusCode);
            }
        }

        [Test, Order(1)]
        public async Task CreateUserTest()
        {
            using(await this.AuthAsync(DefaultDtos.Admin1LoginDto))
            {
                var user1Response = await this.PostAsync<CreateUserDto, UserDto>("api/user", DefaultDtos.CreateUser1Dto);
                Assert.AreEqual(StatusCodes.Status201Created, user1Response.StatusCode);
                var user1 = user1Response.Content;
                AssertHelper.AsserUserEquals(DefaultDtos.User1, user1);

                var user2Response = await this.PostAsync<CreateUserDto, UserDto>("api/user", DefaultDtos.CreateUser2Dto);
                Assert.AreEqual(StatusCodes.Status201Created, user2Response.StatusCode);
                var user2 = user2Response.Content;
                AssertHelper.AsserUserEquals(DefaultDtos.User2, user2);

                var user3Response = await this.PostAsync<CreateUserDto, UserDto>("api/user", DefaultDtos.CreateUser3Dto);
                Assert.AreEqual(StatusCodes.Status201Created, user3Response.StatusCode);
                var user3 = user3Response.Content;
                AssertHelper.AsserUserEquals(DefaultDtos.User3, user3);
            }
        }

        [Test, Order(2)]
        public async Task GetUserTest()
        {
            using (await this.AuthAsync(DefaultDtos.Admin1LoginDto))
            {
                var user1Response = await this.GetAsync<UserDto>("api/user", DefaultDtos.User1.Id);
                Assert.AreEqual(StatusCodes.Status200OK, user1Response.StatusCode);
                var user1 = user1Response.Content;
                AssertHelper.AsserUserEquals(DefaultDtos.User1, user1);

                var user2Response = await this.GetAsync<UserDto>("api/user", DefaultDtos.User2.Id);
                Assert.AreEqual(StatusCodes.Status200OK, user2Response.StatusCode);
                var user2 = user2Response.Content;
                AssertHelper.AsserUserEquals(DefaultDtos.User2, user2);

                var user3Response = await this.GetAsync<UserDto>("api/user", DefaultDtos.User3.Id);
                Assert.AreEqual(StatusCodes.Status200OK, user3Response.StatusCode);
                var user3 = user3Response.Content;
                AssertHelper.AsserUserEquals(DefaultDtos.User3, user3);
            }
        }

        [Test, Order(3)]
        public async Task GetUsersTest()
        {
            using (await this.AuthAsync(DefaultDtos.Admin1LoginDto))
            {
                var usersResponse = await this.FindAsync<UserDto>("api/user");
                Assert.AreEqual(StatusCodes.Status200OK, usersResponse.StatusCode);

                var users = usersResponse.Content.Items;
                Assert.AreEqual(4, usersResponse.Content.Count);

                var user1Response = await this.GetAsync<UserDto>("api/user", DefaultDtos.User1.Id);
                Assert.AreEqual(StatusCodes.Status200OK, user1Response.StatusCode);
                var user1 = user1Response.Content;
                AssertHelper.AsserUserEquals(DefaultDtos.User1, user1);

                var user2 = users.FirstOrDefault(x => x.Id == DefaultDtos.User2.Id);
                Assert.IsNotNull(user2);
                AssertHelper.AsserUserEquals(DefaultDtos.User2, user2!);

                var user3 = users.FirstOrDefault(x => x.Id == DefaultDtos.User3.Id);
                Assert.IsNotNull(user3);
                AssertHelper.AsserUserEquals(DefaultDtos.User3, user3!);
            }
        }

        [Test, Order(4)]
        public async Task UpdateUserByAdminTest()
        {
            var updatedUser = new StoreUserDto
            {
                Id = DefaultDtos.CreateUser1Dto.Id,
                FirstName = "UPDATED_" + DefaultDtos.CreateUser1Dto.FirstName,
                LastName = "UPDATED_" + DefaultDtos.CreateUser1Dto.LastName,
                Email = "UPDATED_" + DefaultDtos.CreateUser1Dto.Email,
                Roles = new List<RoleType>() { RoleType.Author },
                Password = "UPDATED_" + DefaultDtos.CreateUser1Dto.Password
            };

            using (await this.AuthAsync(DefaultDtos.Admin1LoginDto))
            {
                var statusCode = await this.UpdateAsync("api/user", updatedUser);
                Assert.AreEqual(StatusCodes.Status204NoContent, statusCode);

                var userResponse = await this.GetAsync<UserDto>("api/user", updatedUser.Id);
                Assert.AreEqual(StatusCodes.Status200OK, userResponse.StatusCode);
                var user = userResponse.Content;
                AssertHelper.AsserUserEquals(updatedUser, user);
            }

            var testLoginRequestDto = new LoginRequestDto
            {
                Email = updatedUser.Email,
                Password = updatedUser.Password
            };

            using (await this.AuthAsync(testLoginRequestDto)) { }
        }

        [Test, Order(5)]
        public async Task UpdateUserBySelfTest()
        {
            var userLoginRequestDto = new LoginRequestDto
            {
                Email = DefaultDtos.CreateUser2Dto.Email,
                Password = DefaultDtos.CreateUser2Dto.Password
            };

            var updatedUser = new StoreUserDto
            {
                Id = DefaultDtos.CreateUser2Dto.Id,
                FirstName = "UPDATED_" + DefaultDtos.CreateUser2Dto.FirstName,
                LastName = "UPDATED_" + DefaultDtos.CreateUser2Dto.LastName,
                Email = "UPDATED_" + DefaultDtos.CreateUser2Dto.Email,
                Password = "UPDATED_" + DefaultDtos.CreateUser2Dto.Password
            };

            using (await this.AuthAsync(userLoginRequestDto))
            {
                var statusCode = await this.UpdateAsync("api/user", updatedUser);
                Assert.AreEqual(StatusCodes.Status204NoContent, statusCode);

                var userResponse = await this.GetAsync<UserDto>("api/user", updatedUser.Id);
                Assert.AreEqual(StatusCodes.Status200OK, userResponse.StatusCode);
                var user = userResponse.Content;
                AssertHelper.AsserUserEquals(updatedUser, user);
            }

            var testLoginRequestDto = new LoginRequestDto
            {
                Email = updatedUser.Email,
                Password = updatedUser.Password
            };

            using (await this.AuthAsync(testLoginRequestDto)) { }
        }

        [Test, Order(6)]
        public async Task DeleteUserTest()
        {
            using (await this.AuthAsync(DefaultDtos.Admin1LoginDto))
            {
                var statusCode = await this.DeleteAsync("api/user", DefaultDtos.User1.Id);
                Assert.AreEqual(StatusCodes.Status204NoContent, statusCode);

                var usersResponse = await this.FindAsync<UserDto>("api/user");
                Assert.AreEqual(StatusCodes.Status200OK, usersResponse.StatusCode);
                Assert.AreEqual(3, usersResponse.Content.Count);

                var user1Response = await this.GetAsync<UserDto>("api/user", DefaultDtos.User1.Id);
                Assert.AreEqual(StatusCodes.Status404NotFound, user1Response.StatusCode);
            }
        }
    }
}

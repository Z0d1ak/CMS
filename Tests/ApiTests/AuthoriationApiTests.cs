using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NUnit.Framework;
using web.Dto;

namespace Tests.ApiTests
{
    [TestFixture]
    public class AuthoriationApiTests : ApiTestBase
    {
        [Test]
        public async Task SimpleAuthTest()
        {
            var adminLoginRequestDto = new LoginRequestDto
            {
                Email = "admin@admin.com",
                Password = "Master1234"
            };

            var response = await this.PostAsync<LoginRequestDto, LoginResponseDto>(
                "api/auth/login",
                adminLoginRequestDto);
            Assert.AreEqual(response.StatusCode, StatusCodes.Status200OK);

            var superAdmin = response.Content.User;
            Assert.AreEqual("admin@admin.com", superAdmin.Email);
        } 
    }
}

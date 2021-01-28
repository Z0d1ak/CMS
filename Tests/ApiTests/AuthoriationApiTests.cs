using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NUnit.Framework;
using Tests.Helpers;
using web.Dto;

namespace Tests.ApiTests
{
    [TestFixture]
    public class AuthoriationApiTests : ApiTestBase
    {
        [Test]
        public async Task SimpleAuthTest()
        {
            var response = await this.PostAsync<LoginRequestDto, LoginResponseDto>(
                "api/auth/login",
                DefaultDtos.SuperAdminLoginDto);
            Assert.AreEqual(response.StatusCode, StatusCodes.Status200OK);

            var superAdmin = response.Content.User;
            Assert.AreEqual("admin@admin.com", superAdmin.Email);
        } 
    }
}

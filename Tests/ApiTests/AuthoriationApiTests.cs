using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NUnit.Framework;
using Tests.Helpers;
using web.Dto;
using web.Dto.Request;
using web.Dto.Response;

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
            Assert.AreEqual(StatusCodes.Status200OK, response.StatusCode);

            var superAdmin = response.Content.User;
            Assert.AreEqual(DefaultDtos.SuperAdminLoginDto.Email, superAdmin.Email);
        } 
    }
}

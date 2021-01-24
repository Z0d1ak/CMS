using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NUnit.Framework;
using Tests.Helpers;
using web.Dto;

namespace Tests.ApiTests
{
    [TestFixture]
    public class CompanyApiTests
        : ApiTestBase
    {
        private CreateCompanyDto createCompany1Dto = new CreateCompanyDto
        {
            Id = Guid.NewGuid(),
            Name = "company1",
            Admin = new CreateAdminDto
            {
                Id = Guid.NewGuid(),
                Email = "admin1@admin.com",
                FirstName = "admin1",
                LastName = "admin1",
                Password = "Master1234"
            }
        };

        [Test, Order(1)]
        public async Task CreateCompanyTest()
        {
            var superAdminAuthResponse = await this.PostAsync<LoginRequestDto, LoginResponseDto>(
                "api/auth/login",
                DefaultDtos.SuperAdminLoginDto);
            Assert.AreEqual(superAdminAuthResponse.StatusCode, StatusCodes.Status200OK);
            using (new AuthenticationScope(superAdminAuthResponse.Content.SecurityToken))
            {
                var company1Response = await this.PostAsync<CreateCompanyDto, CompanyDto>("api/company", this.createCompany1Dto);
                Assert.AreEqual(StatusCodes.Status201Created, company1Response.StatusCode);
                var company1 = company1Response.Content;
                Assert.AreEqual(this.createCompany1Dto.Id, company1.Id);
                Assert.AreEqual(this.createCompany1Dto.Name, company1.Name);
            }
        }

        [Test, Order(2)]
        public async Task GetCompanyTest()
        {
            var superAdminAuthResponse = await this.PostAsync<LoginRequestDto, LoginResponseDto>(
               "api/auth/login",
               DefaultDtos.SuperAdminLoginDto);
            Assert.AreEqual(superAdminAuthResponse.StatusCode, StatusCodes.Status200OK);
            using (new AuthenticationScope(superAdminAuthResponse.Content.SecurityToken))
            {
                var getCompany1Response = await this.GetAsync<CompanyDto>("api/company", this.createCompany1Dto.Id);
                Assert.AreEqual(StatusCodes.Status200OK, getCompany1Response.StatusCode);
                var company1 = getCompany1Response.Content;
                Assert.AreEqual(this.createCompany1Dto.Id, company1.Id);
                Assert.AreEqual(this.createCompany1Dto.Name, company1.Name);
            }
        }

    }
}

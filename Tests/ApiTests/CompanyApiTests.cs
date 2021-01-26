using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NUnit.Framework;
using Tests.Helpers;
using web.Dto;

namespace Tests.ApiTests
{
    [TestFixture]
    public sealed class CompanyApiTests
        : ApiTestBase
    {
        [Test, Order(1)]
        public async Task CreateCompanyTest()
        {
            using (await this.AuthAsync(DefaultDtos.SuperAdminLoginDto))
            {
                var company1Response = await this.PostAsync<CreateCompanyDto, CompanyDto>("api/company", DefaultDtos.CreateCompany1Dto);
                Assert.AreEqual(StatusCodes.Status201Created, company1Response.StatusCode);
                var company1 = company1Response.Content;
                Assert.AreEqual(DefaultDtos.Company1.Id, company1.Id);
                Assert.AreEqual(DefaultDtos.Company1.Name, company1.Name);
            }
        }

        [Test, Order(2)]
        public async Task GetCompanyTest()
        {
            using (await this.AuthAsync(DefaultDtos.SuperAdminLoginDto))
            {
                var getCompany1Response = await this.GetAsync<CompanyDto>("api/company", DefaultDtos.Company1.Id);
                Assert.AreEqual(StatusCodes.Status200OK, getCompany1Response.StatusCode);
                var company1 = getCompany1Response.Content;
                Assert.AreEqual(DefaultDtos.Company1.Id, company1.Id);
                Assert.AreEqual(DefaultDtos.Company1.Name, company1.Name);
            }

            using (await this.AuthAsync(DefaultDtos.Admin1LoginDto))
            {
                var getCompany1Response = await this.GetAsync<CompanyDto>("api/company", DefaultDtos.Company1.Id);
                Assert.AreEqual(StatusCodes.Status200OK, getCompany1Response.StatusCode);
                var company1 = getCompany1Response.Content;
                Assert.AreEqual(DefaultDtos.Company1.Id, company1.Id);
                Assert.AreEqual(DefaultDtos.Company1.Name, company1.Name);
            }
        }

        [Test, Order(3)]
        public async Task ListCompaniesTest()
        {
            using (await this.AuthAsync(DefaultDtos.SuperAdminLoginDto))
            {
                var getCompaniesResponse = await this.FindAsync<CompanyDto>("api/company");
                Assert.AreEqual(StatusCodes.Status200OK, getCompaniesResponse.StatusCode);
                var companies = getCompaniesResponse.Content;
                Assert.AreEqual(2, companies.Count());
                var company1 = companies.FirstOrDefault(x => x.Id == DefaultDtos.Company1.Id);
                Assert.NotNull(company1);
            }
        }

        [Test, Order(4)]
        public async Task UpdateCompanyTest()
        {
            var company1Changed = new CompanyDto
            {
                Id = DefaultDtos.Company1.Id,
                Name = "Changed"
            };

            using (await this.AuthAsync(DefaultDtos.Admin1LoginDto))
            {
                var statusCode = await this.UpdateAsync("api/company", company1Changed);
                Assert.AreEqual(StatusCodes.Status204NoContent, statusCode);

                var getCompany1Response = await this.GetAsync<CompanyDto>("api/company", DefaultDtos.Company1.Id);
                Assert.AreEqual(StatusCodes.Status200OK, getCompany1Response.StatusCode);
                var company1 = getCompany1Response.Content;
                Assert.AreEqual(company1Changed.Id, company1.Id);
                Assert.AreEqual(company1Changed.Name, company1.Name);
            }
        }

        [Test, Order(5)]
        public async Task DeleteCompanyTest()
        {
            using (await this.AuthAsync(DefaultDtos.SuperAdminLoginDto))
            {
                var statusCode = await this.DeleteAsync("api/company", DefaultDtos.Company1.Id);
                Assert.AreEqual(StatusCodes.Status204NoContent, statusCode);

                var getCompaniesResponse = await this.FindAsync<CompanyDto>("api/company");
                Assert.AreEqual(StatusCodes.Status200OK, getCompaniesResponse.StatusCode);
                var companies = getCompaniesResponse.Content;
                Assert.AreEqual(1, companies.Count());
            }
            using (await this.AuthAsync(DefaultDtos.SuperAdminLoginDto))
            {
                var getCompany1Response = await this.GetAsync<CompanyDto>("api/company", DefaultDtos.Company1.Id);
                Assert.AreEqual(StatusCodes.Status404NotFound, getCompany1Response.StatusCode);

                var statusCode = await this.DeleteAsync("api/company", DefaultDtos.Company1.Id);
                Assert.AreEqual(StatusCodes.Status404NotFound, statusCode);
            }
        }
    }
}

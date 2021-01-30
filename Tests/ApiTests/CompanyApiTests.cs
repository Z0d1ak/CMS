using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NUnit.Framework;
using Tests.Helpers;
using web.Dto.Request;
using web.Dto.Response;

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
                var company1Response = await this.PostAsync<CreateCompanyDto, ResponseCompanyDto>("api/company", DefaultDtos.CreateCompany1Dto);
                Assert.AreEqual(StatusCodes.Status201Created, company1Response.StatusCode);
                AssertHelper.AreEquals(DefaultDtos.StoreCompany1Dto, company1Response.Content);
            }
        }

        [Test, Order(2)]
        public async Task GetCompanyTest()
        {
            using (await this.AuthAsync(DefaultDtos.SuperAdminLoginDto))
            {
                var getCompany1Response = await this.GetAsync<ResponseCompanyDto>("api/company", DefaultDtos.Company1Id);
                Assert.AreEqual(StatusCodes.Status200OK, getCompany1Response.StatusCode);
                AssertHelper.AreEquals(DefaultDtos.StoreCompany1Dto, getCompany1Response.Content);
            }

            using (await this.AuthAsync(DefaultDtos.Admin1LoginDto))
            {
                var getCompany1Response = await this.GetAsync<ResponseCompanyDto>("api/company", DefaultDtos.Company1Id);
                Assert.AreEqual(StatusCodes.Status200OK, getCompany1Response.StatusCode);
                AssertHelper.AreEquals(DefaultDtos.StoreCompany1Dto, getCompany1Response.Content);
            }
        }

        [Test, Order(3)]
        public async Task ListCompaniesTest()
        {
            using (await this.AuthAsync(DefaultDtos.SuperAdminLoginDto))
            {
                var getCompaniesResponse = await this.FindAsync<ResponseCompanyDto>("api/company");
                Assert.AreEqual(StatusCodes.Status200OK, getCompaniesResponse.StatusCode);
                var companies = getCompaniesResponse.Content.Items;
                Assert.AreEqual(2, getCompaniesResponse.Content.Count);
                var company1 = companies.FirstOrDefault(x => x.Id == DefaultDtos.Company1Id);
                Assert.NotNull(company1);
            }
        }

        [Test, Order(4)]
        public async Task UpdateCompanyTest()
        {
            var company1Changed = new StoreCompanyDto
            {
                Id = DefaultDtos.Company1Id,
                Name = "Changed"
            };

            using (await this.AuthAsync(DefaultDtos.Admin1LoginDto))
            {
                var statusCode = await this.UpdateAsync("api/company", company1Changed);
                Assert.AreEqual(StatusCodes.Status204NoContent, statusCode);

                var getCompany1Response = await this.GetAsync<ResponseCompanyDto>("api/company", DefaultDtos.Company1Id);
                Assert.AreEqual(StatusCodes.Status200OK, getCompany1Response.StatusCode);
                AssertHelper.AreEquals(company1Changed, getCompany1Response.Content);
            }
        }

        [Test, Order(5)]
        public async Task DeleteCompanyTest()
        {
            using (await this.AuthAsync(DefaultDtos.SuperAdminLoginDto))
            {
                var statusCode = await this.DeleteAsync("api/company", DefaultDtos.Company1Id);
                Assert.AreEqual(StatusCodes.Status204NoContent, statusCode);

                var getCompaniesResponse = await this.FindAsync<ResponseCompanyDto>("api/company");
                Assert.AreEqual(StatusCodes.Status200OK, getCompaniesResponse.StatusCode);
                Assert.AreEqual(1, getCompaniesResponse.Content.Count);
            }
            using (await this.AuthAsync(DefaultDtos.SuperAdminLoginDto))
            {
                var getCompany1Response = await this.GetAsync<ResponseCompanyDto>("api/company", DefaultDtos.Company1Id);
                Assert.AreEqual(StatusCodes.Status404NotFound, getCompany1Response.StatusCode);

                var statusCode = await this.DeleteAsync("api/company", DefaultDtos.Company1Id);
                Assert.AreEqual(StatusCodes.Status404NotFound, statusCode);
            }
        }
    }
}

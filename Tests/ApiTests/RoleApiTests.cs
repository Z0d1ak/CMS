using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NUnit.Framework;
using Tests.Helpers;
using web.Dto;


namespace Tests.ApiTests
{
    [TestFixture]
    public class RoleApiTests
        : ApiTestBase
    {
        [OneTimeSetUp]
        public override async Task OneTimeSetUpAsync()
        {
            await base.OneTimeSetUpAsync();

            using (await this.AuthAsync(DefaultDtos.SuperAdminLoginDto))
            {
                var company1Response = await this.PostAsync<CreateCompanyDto, CompanyDto>("api/company", DefaultDtos.CreateCompany1Dto);
                Assert.AreEqual(StatusCodes.Status201Created, company1Response.StatusCode);
            }
        }

        private IEnumerable<RoleDto> roles = null!;

        [Test, Order(1)]
        public async Task GetRolesTest()
        {
            using (await this.AuthAsync(DefaultDtos.Admin1LoginDto))
            {
                var rolesResponse = await this.FindAsync<RoleDto>("api/role");
                Assert.AreEqual(StatusCodes.Status200OK, rolesResponse.StatusCode);

                this.roles = rolesResponse.Content.Items;
                Assert.AreEqual(5, rolesResponse.Content.Count);
            }
        }

        [Test, Order(2)]
        public async Task GetRoleTest()
        {
            Assert.AreNotEqual(0, this.roles.ToEmptyIfNull());

            using (await this.AuthAsync(DefaultDtos.Admin1LoginDto))
            {
                foreach (var role in this.roles)
                {
                    var roleFromDbResponse = await this.GetAsync<RoleDto>("api/role", role.Id);
                    Assert.AreEqual(StatusCodes.Status200OK, roleFromDbResponse.StatusCode);
                    var roleFromDb = roleFromDbResponse.Content;

                    Assert.AreEqual(role.Name, roleFromDb.Name);
                    Assert.AreEqual(role.Type, roleFromDb.Type);
                }
            }
        }

        [Test, Order(3)]
        public async Task UpdateRoleTest()
        {
            Assert.AreNotEqual(0, this.roles.ToEmptyIfNull());

            using (await this.AuthAsync(DefaultDtos.Admin1LoginDto))
            {
                var firstRole = this.roles.First();
                var roleForUpdate = new RoleDto
                {
                    Id = firstRole.Id,
                    Name = firstRole.Name + "_UPDATED",
                    Type = firstRole.Type
                };

                var statusCode = await this.UpdateAsync("api/role", roleForUpdate);
                Assert.AreEqual(StatusCodes.Status204NoContent, statusCode);

                var roleFromDbResponse = await this.GetAsync<RoleDto>("api/role", roleForUpdate.Id);
                Assert.AreEqual(StatusCodes.Status200OK, roleFromDbResponse.StatusCode);
                var roleFromDb = roleFromDbResponse.Content;

                Assert.AreEqual(roleForUpdate.Name, roleFromDb.Name);
                Assert.AreEqual(roleForUpdate.Type, roleFromDb.Type);
            }
        }
    }
}

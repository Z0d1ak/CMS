using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using web.Dto;
using web.Options;
using web.Other.SearchParameters;
using web.Services;

namespace web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }
        [Authorize(Roles = AccessRoles.CompanyAdmin)]
        [HttpPost]
        public async Task<ActionResult<UserDto>> Create(CreateUserDto createUserDto)
        {
            var result = await this.userService.CreateAsync(createUserDto, this.HttpContext.RequestAborted);

            if (result.IsSuccessful())
            {
                return this.CreatedAtAction(nameof(UserController.GetUser), result.Value);
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        [HttpGet("{id}", Name = nameof(UserController.GetUser))]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetUser([FromRoute] Guid id)
        {
            var result = await this.userService.GetByIdAsync(id, this.HttpContext.RequestAborted);

            if (result.IsSuccessful())
            {
                return this.Ok(result.Value);
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        [HttpGet]
        [Authorize(Roles = AccessRoles.AnyAdmin)]
        public async Task<ActionResult<IEnumerable<UserDto>>> Find([FromQuery] UserSearchParameters searchParameters)
        {
            var result = await this.userService.FindAsync(searchParameters, this.HttpContext.RequestAborted);

            if (result.IsSuccessful())
            {
                return this.Ok(result.Value);
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult> Update(StoreUserDto storeUserDto)
        {
            var result = await this.userService.UpdateAsync(storeUserDto, this.HttpContext.RequestAborted);

            if (result.IsSucessful())
            {
                return this.NoContent();
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = AccessRoles.AnyAdmin)]
        public async Task<ActionResult> Delete([FromRoute] Guid id)
        {
            var result = await this.userService.DeleteAsync(id, this.HttpContext.RequestAborted);

            if (result.IsSucessful())
            {
                return this.NoContent();
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }
    }
}

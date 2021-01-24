using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using web.Dto;
using web.Services;

namespace web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        #region Private Fields

        private readonly IAuthService authService;

        #endregion

        #region Constructor

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        #endregion

        #region Endpoints

        /// <summary>
        /// Авторизация в системе.
        /// </summary>
        /// <param name="authDto">Почта и пароль.</param>
        /// <returns>JWT токен и информация о пользователе.</returns>
        /// <response code="200">Авторизация прошла успешно.</response>
        /// <response code="401">Пароль или почта неверные.</response>
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto authDto)
        {
            var serviceResult = await this.authService.LoginAsync(authDto, this.HttpContext.RequestAborted);

            if(serviceResult.IsSuccessful())
            {
                return this.Ok(serviceResult.Value);
            }
            else
            {
                return this.StatusCode(serviceResult.ErrorStatusCode);
            }
        }

        #endregion
    }
}

using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using web.Dto.Request;
using web.Dto.Response;
using web.Services;

namespace web.Controllers
{
    /// <summary>
    /// Методы для авторизации в системе.
    /// </summary>
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
        /// <param name="loginRequestDto">Почта и пароль.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <returns>JWT токен и информация о пользователе.</returns>
        /// <response code="200">Авторизация прошла успешно.</response>
        /// <response code="401">Пароль или почта неверные.</response>
        [HttpPost("login")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<LoginResponseDto>> LoginAsync([FromBody] LoginRequestDto loginRequestDto, CancellationToken cancellationToken)
        {
            var serviceResult = await this.authService.LoginAsync(loginRequestDto, cancellationToken);

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

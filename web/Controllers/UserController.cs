using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Options;
using web.Services;

namespace web.Controllers
{
    /// <summary>
    /// CRUD пользователей.
    /// </summary>
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class UserController : ControllerBase
    {
        #region Private Fields

        private readonly IUserService userService;

        #endregion

        #region Constructor

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        #endregion

        #region Endpoints

        /// <summary>
        /// Создает пользователя.
        /// </summary>
        /// <param name="createUserDto"></param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <returns>Созданный пользователь.</returns>
        /// <response code="201">Пользователь успешно создан.</response>
        /// <response code="409">Конфликт данных создаваемого пользователя и существующих данных в БД.</response>
        [HttpPost]
        [Authorize(Roles = AccessRoles.AnyAdmin)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<ResponseUserDto>> CreateUserAsync(CreateUserDto createUserDto, CancellationToken cancellationToken)
        {
            var result = await this.userService.CreateAsync(createUserDto, cancellationToken);

            if (result.IsSuccessful())
            {
                return this.CreatedAtAction(nameof(UserController.GetUserAsync), result.Value);
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        /// <summary>
        /// Вовращает пользователя по Id.
        /// </summary>
        /// <param name="id">Индентификатор пользователя.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <returns>Пользователь.</returns>
        /// <response code="200">Пользователь найден.</response>
        /// <response code="404">Пользователь не найден.</response>
        [HttpGet("{id}", Name = nameof(UserController.GetUserAsync))]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ResponseUserDto>> GetUserAsync([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var result = await this.userService.GetByIdAsync(id, cancellationToken);

            if (result.IsSuccessful())
            {
                return this.Ok(result.Value);
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        /// <summary>
        /// Возвращает список пользователей, удовлитворяющий параметрам фильтрации.
        /// </summary>
        /// <param name="searchParameters"></param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <returns>Список пользователей.</returns>
        /// <response code="200">Запрос успешный.</response>
        [HttpGet]
        [Authorize(Roles = AccessRoles.AnyAdmin)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<SearchResponseDto<ResponseUserDto>>> FindUsersAsync([FromQuery] UserSearchParameters searchParameters, CancellationToken cancellationToken)
        {
            var result = await this.userService.FindAsync(searchParameters, cancellationToken);

            if (result.IsSuccessful())
            {
                return this.Ok(result.Value);
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        /// <summary>
        /// Изменяет данные пользователя.
        /// </summary>
        /// <param name="storeUserDto"></param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <response code="204">Данные пользователя успешно изменены.</response>
        /// <response code="403">Недостаточно прав.</response>
        /// <response code="404">Пользователь не найден.</response>
        /// <response code="409">[В планах] Конфликт новых данных пользователя и существующих данных в БД.</response>
        [HttpPut]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> UpdateUserAsync(StoreUserDto storeUserDto, CancellationToken cancellationToken)
        {
            var result = await this.userService.UpdateAsync(storeUserDto, cancellationToken);

            if (result.IsSucessful())
            {
                return this.NoContent();
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        /// <summary>
        /// Удаляет пользователя.
        /// </summary>
        /// <param name="id">Индентификатор пользователя.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <response code="204">Пользователь успешно удален.</response>
        /// <response code="404">Пользователь не найден.</response>
        [HttpDelete("{id}")]
        [Authorize(Roles = AccessRoles.AnyAdmin)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteUserAsync([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var result = await this.userService.DeleteAsync(id, cancellationToken);

            if (result.IsSucessful())
            {
                return this.NoContent();
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        #endregion
    }
}

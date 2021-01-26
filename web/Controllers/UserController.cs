using System;
using System.Collections.Generic;
using System.Threading;
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
        [Authorize(Roles = AccessRoles.CompanyAdmin)]
        [HttpPost]
        public async Task<ActionResult<UserDto>> Create(CreateUserDto createUserDto, CancellationToken cancellationToken)
        {
            var result = await this.userService.CreateAsync(createUserDto, cancellationToken);

            if (result.IsSuccessful())
            {
                return this.CreatedAtAction(nameof(UserController.GetUser), result.Value);
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
        [HttpGet("{id}", Name = nameof(UserController.GetUser))]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetUser([FromRoute] Guid id, CancellationToken cancellationToken)
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
        public async Task<ActionResult<IEnumerable<UserDto>>> Find([FromQuery] UserSearchParameters searchParameters, CancellationToken cancellationToken)
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
        /// <response code="404">Компания не найдена.</response>
        /// <response code="409">[В планах] Конфликт новых данных пользователя и существующих данных в БД.</response>
        [HttpPut]
        [Authorize]
        public async Task<ActionResult> Update(StoreUserDto storeUserDto, CancellationToken cancellationToken)
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
        [HttpDelete("{id}")]
        [Authorize(Roles = AccessRoles.AnyAdmin)]
        public async Task<ActionResult> Delete([FromRoute] Guid id, CancellationToken cancellationToken)
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

﻿using System;
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
    /// Просмотр и изменение ролей.
    /// </summary>
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class RoleController
        : ControllerBase
    {
        #region Private Fields

        private readonly IRoleService roleService;

        #endregion

        #region Constructor

        public RoleController(IRoleService roleService)
        {
            this.roleService = roleService;
        }

        #endregion

        #region Endpoints 

        /// <summary>
        /// Возвращает роль по Id.
        /// </summary>
        /// <param name="id">Индентификатор роли.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <returns>Роль.</returns>
        /// <response code="200">Роль найдена.</response>
        /// <response code="404">Роль не найдена.</response>
        [HttpGet("{id}", Name = nameof(RoleController.GetRoleAsync))]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ResponseRoleDto>> GetRoleAsync([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var result = await this.roleService.GetByIdAsync(id, cancellationToken);

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
        /// Возвращает список ролей, удовлитворяющий параметрам фильтрации.
        /// </summary>
        /// <param name="roleSearchParameters">Параметры фильтрации.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <returns>Список Ролей.</returns>
        /// <response code="200">Запрос успешный.</response>
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<SearchResponseDto<ResponseRoleDto>>> FindRolesAsync([FromQuery] RoleSearchParameters roleSearchParameters, CancellationToken cancellationToken)
        {
            var result = await this.roleService.FindAsync(roleSearchParameters, cancellationToken);

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
        /// Изменяет данные роли.
        /// </summary>
        /// <param name="storeRoleDto">Изменная компания.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <response code="204">Данные роли успешно изменены.</response>
        /// <response code="404">Роль не найдена.</response>
        /// <response code="409">[В планах] Конфликт новых данных роли и существующих данных в БД.</response>
        [HttpPut]
        [Authorize(Roles = AccessRoles.AnyAdmin)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> UpdateRoleAsync(StoreRoleDto storeRoleDto, CancellationToken cancellationToken)
        {
            var result = await this.roleService.UpdateAsync(storeRoleDto, cancellationToken);

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

using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using web.Dto;
using web.Dto.Request;
using web.Dto.Response;
using web.Options;
using web.Other.SearchParameters;
using web.Services;

namespace web.Controllers
{
    /// <summary>
    /// CRUD компаний.
    /// </summary>
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class CompanyController : ControllerBase
    {
        #region Private Fields

        private readonly ICompanyService companyService;

        #endregion

        #region Constructor

        public CompanyController(ICompanyService companyService)
        {
            this.companyService = companyService;
        }

        #endregion

        #region Endpoints

        /// <summary>
        /// Создает новую компанию.
        /// </summary>
        /// <remarks>
        /// При создании компании сразу создаются стандартные роли для данной компании и администратор компании.
        /// </remarks>
        /// <param name="createCompanyDto">Информация о создаваемой компании.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <returns>Созданная компания.</returns>
        /// <response code="201">Компания успешно создана.</response>
        /// <response code="409">Конфликт данных создаваемой компании и существующих данных в БД.</response>
        [HttpPost]
        [Authorize(Roles = AccessRoles.SuperAdmin)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<ResponseCompanyDto>> CreateCompanyAsync(CreateCompanyDto createCompanyDto, CancellationToken cancellationToken)
        {
            var result = await this.companyService.CreateAsync(createCompanyDto, cancellationToken);

            if (result.IsSuccessful())
            {
                return this.CreatedAtAction(nameof(CompanyController.GetCompanyAsync), result.Value.Id, result.Value);
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        /// <summary>
        /// Возвращает компанию по Id.
        /// </summary>
        /// <param name="id">Индентификатор компании.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <returns>Компания.</returns>
        /// <response code="200">Компания найдена.</response>
        /// <response code="404">Компания не найдена.</response>
        [HttpGet("{id}", Name = nameof(CompanyController.GetCompanyAsync))]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ResponseCompanyDto>> GetCompanyAsync([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var result = await this.companyService.GetByIdAsync(id, cancellationToken);

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
        /// Возвращает список компаний, удовлитворяющий параметрам фильтрации.
        /// </summary>
        /// <param name="companySearchParameters">Параметры фильтрации.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <returns>Список компаний.</returns>
        /// <response code="200">Запрос успешный.</response>
        [HttpGet]
        [Authorize(Roles = AccessRoles.SuperAdmin)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<SearchResponseDto<ResponseCompanyDto>>> FindCompaniesAsync([FromQuery] CompanySearchParameters companySearchParameters, CancellationToken cancellationToken)
        {
            var result = await this.companyService.FindAsync(companySearchParameters, cancellationToken);

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
        /// Изменяет данные компании.
        /// </summary>
        /// <param name="storeCompanyDto">Изменная компания.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <response code="204">Данные компании успешно изменены.</response>
        /// <response code="404">Компания не найдена.</response>
        /// <response code="409">[В планах] Конфликт новых данных компании и существующих данных в БД.</response>
        [HttpPut]
        [Authorize(Roles = AccessRoles.AnyAdmin)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> UpdateCompanyAsync(StoreCompanyDto storeCompanyDto, CancellationToken cancellationToken)
        {
            var result = await this.companyService.UpdateAsync(storeCompanyDto, cancellationToken);

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
        /// Удаляет компанию.
        /// </summary>
        /// <param name="id">Индентификатор компании.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <response code="204">Компания успешно удалена.</response>
        /// <response code="404">Компания не найдена.</response>
        [HttpDelete("{id}")]
        [Authorize(Roles = AccessRoles.SuperAdmin)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteCompanyAsync([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var result = await this.companyService.DeleteAsync(id, cancellationToken);

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

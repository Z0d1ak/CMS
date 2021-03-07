using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Services;

namespace web.Controllers
{
    /// <summary>
    /// CRUD статей.
    /// </summary>
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class ArticleController : ControllerBase
    {
        #region Private Fileds

        private readonly IArticleService articleService;

        #endregion

        #region Conctructor

        public ArticleController(
            IArticleService articleService)
        {
            this.articleService = articleService;
        }

        #endregion

        #region Endpoints

        /// <summary>
        /// Создает новую статью.
        /// </summary>
        /// <param name="createCompanyDto">Информация о создаваемой статье.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <returns>Созданная стаьтья.</returns>
        /// <response code="201">Компания успешно создана.</response>
        /// <response code="409">Конфликт данных создаваемой компании и существующих данных в БД.</response>
        /// <response code="403">Недостатьчно прав для создания статьи.</response>
        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<ResponseArticleDto>> CreateArticleAsync(StoreArticleDto createCompanyDto, CancellationToken cancellationToken)
        {
            var result = await this.articleService.CreateAsync(createCompanyDto, cancellationToken);

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
        /// Возвращает статью по Id.
        /// </summary>
        /// <param name="id">Индентификатор Статьи.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <returns>Статья.</returns>
        /// <response code="200">Статья найдена.</response>
        /// <response code="404">Статья не найдена.</response>
        [HttpGet("{id}", Name = nameof(ArticleController.GetArticleAsync))]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ResponseArticleDto>> GetArticleAsync([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var result = await this.articleService.GetByIdAsync(id, cancellationToken);

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
        /// Возвращает список стаьтей, удовлитворяющий параметрам фильтрации.
        /// </summary>
        /// <param name="articleSearchParameters">Параметры фильтрации.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <returns>Список статей.</returns>
        /// <response code="200">Запрос успешный.</response>
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<SearchResponseDto<ResponseArticleInfoDto>>> FindArticlesAsync([FromQuery] ArticleSearchParameters articleSearchParameters, CancellationToken cancellationToken)
        {
            var result = await this.articleService.FindAsync(articleSearchParameters, cancellationToken);

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
        /// Изменяет данные статьи.
        /// </summary>
        /// <param name="storeArticleDto">Изменная стьтья.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <response code="204">Данные статьи успешно изменены.</response>
        /// <response code="403">Недостаточно прав для изменения статьи.</response>
        /// <response code="404">Статья не найдена.</response>
        /// <response code="409">Конфликт новых данных стьатьи и существующих данных в БД.</response>
        [HttpPut]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<ResponseArticleDto>> UpdateArticleAsync(StoreArticleDto storeArticleDto, CancellationToken cancellationToken)
        {
            var result = await this.articleService.UpdateAsync(storeArticleDto, cancellationToken);

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
        /// Удаляет стаьтью.
        /// </summary>
        /// <param name="id">Индентификатор статьи.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <response code="204">Стаьтья успешно удалена.</response>
        /// <response code="403">Недостаточно прав для удаления статьи.</response>
        /// <response code="404">Стьатья не найдена.</response>
        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteArticleAsync(Guid id, CancellationToken cancellationToken)
        {
            var result = await this.articleService.DeleteAsync(id, cancellationToken);

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

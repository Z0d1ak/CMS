using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using web.Contracts.Dto.Request;
using web.Services;

namespace web.Controllers
{
    /// <summary>
    /// Методы для отправки и изменения заданий.
    /// </summary>
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class TaskController : ControllerBase
    {
        #region Private Fileds

        private readonly IWfService wfService;

        #endregion

        #region Conctructor

        public TaskController(
            IWfService wfService)
        {
            this.wfService = wfService;
        }

        #endregion

        #region Endpoints

        /// <summary>
        /// Берет задание в работу.
        /// </summary>
        /// <param name="taskId">Id Задания.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <response code="200">Задание успешно взято в работу.</response>
        /// <response code="404">Задание не найдено.</response>
        /// <response code="409">Задание уже взято в работу.</response>
        /// <response code="403">Недостатьчно прав для взятия задания в работу.</response>
        [HttpPost("take")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult> TakeInWorkAsync(Guid taskId, CancellationToken cancellationToken)
        {
            var result = await this.wfService.TakeInWorkAsync(taskId, cancellationToken);

            if (result.IsSucessful())
            {
                return this.Ok();
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        /// <summary>
        /// Завершает задание.
        /// </summary>
        /// <param name="finishTaskDto">Id Задания.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <response code="200">Задание успешно завершено.</response>
        /// <response code="404">Задание не найдено.</response>
        /// <response code="409">Задание уже завершено.</response>
        /// <response code="403">Недостаточно прав для заверешния задания.</response>
        [HttpPost("finish")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult> FinishTaskAsync(FinishTaskDto finishTaskDto, CancellationToken cancellationToken)
        {
            var result = await this.wfService.FinishTaskAsync(finishTaskDto, cancellationToken);

            if (result.IsSucessful())
            {
                return this.Ok();
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        /// <summary>
        /// Создает задание.
        /// </summary>
        /// <param name="createTaskDto">Id Задания.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <response code="201">Задание успешно создано.</response>
        /// <response code="409">НЕвозможно создать задание данного типа.</response>
        /// <response code="403">Недостаточно прав для создания задания.</response>
        [HttpPost("create")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult> CreateTaskAsync(CreateTaskDto createTaskDto, CancellationToken cancellationToken)
        {
            var result = await this.wfService.CreateTaskAsync(createTaskDto, cancellationToken);

            if (result.IsSucessful())
            {
                return this.Ok();
            }
            else
            {
                return this.StatusCode(result.ErrorStatusCode);
            }
        }

        #endregion
    }
}

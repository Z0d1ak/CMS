using System;
using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Other;

namespace web.Services
{
    public interface IWfService
    {

        Task<ServiceResult> TakeInWorkAsync(Guid taskId, CancellationToken cancellationToken);

        Task<ServiceResult> FinishTaskAsync(FinishTaskDto finishTaskDto, CancellationToken cancellationToken);

        Task<ServiceResult> CreateTaskAsync(CreateTaskDto createTaskDto, CancellationToken cancellationToken);
    }
}

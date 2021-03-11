using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Other;

namespace web.Services
{
    public class WfService : IWfService
    {
        public Task<ServiceResult> CreateTaskAsync(CreateTaskDto createTaskDto, CancellationToken cancellationToken)
        {
            // Проверить, что пользователь может создать такое задание.
            // Кейс 1: Автор инициирует статью
            // Кейс 2: Редактор назначает 
            throw new NotImplementedException();
        }

        public Task<ServiceResult> FinishTaskAsync(FinishTaskDto finishTaskDto, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResult> TakeInWorkAsync(Guid taskId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}

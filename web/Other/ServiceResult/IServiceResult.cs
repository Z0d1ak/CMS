using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Other.ServiceResult
{
    /// <summary>
    /// Интерфейс враппера, оборачивающего результат вызова сервиса и ошибку.
    /// </summary>
    public interface IServiceResult<T>
    {
        T Result { get; set; }

        IServiceMessage Error { get; set; }
    }
}

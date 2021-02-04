using System;
using Microsoft.AspNetCore.Http;

namespace web.Other
{
    /// <summary>
    /// Обертка над ответом сервера, которая содержит сам ответ или код ошибки из <see cref="StatusCodes"/>.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ServiceResult<T>
    {
        private readonly bool isSuccessful;

        private readonly T value = default!;
        public ServiceResult(T value)
        {
            this.isSuccessful = true;
            this.value = value;
        }

        public ServiceResult(int errorStatucCode)
        {
            this.ErrorStatusCode = errorStatucCode;
        }

        public T Value
        {
            get
            {
                if (this.IsSuccessful())
                {
                    return this.value;
                }

                throw new InvalidOperationException();
            }
        }

        public int ErrorStatusCode { get;}

        public bool IsSuccessful()
        {
            return this.isSuccessful;
        }
    }
}

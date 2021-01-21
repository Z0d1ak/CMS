using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Other.ServiceResult
{
    public class ServiceResult<T>
        : IServiceResult<T>
    {
        public T Result { get; set; }

        public IServiceMessage Error { get; set; }
    }
}

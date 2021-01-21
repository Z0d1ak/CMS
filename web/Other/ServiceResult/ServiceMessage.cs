using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Other.ServiceResult
{
    public class ServiceMessage
        : IServiceMessage
    {
        public string Message => throw new NotImplementedException();

        public int? StatusCode => throw new NotImplementedException();
    }
}

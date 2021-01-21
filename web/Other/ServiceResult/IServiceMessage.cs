using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Other.ServiceResult
{
    public interface IServiceMessage
    {
        
        string Message { get;}

        int? StatusCode { get;}
    }
}

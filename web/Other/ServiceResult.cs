using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Other
{
    public class ServiceResult
    {
        private readonly bool isSuccessful;
       
        private ServiceResult()
        {
            this.isSuccessful = true;
        }

        public ServiceResult(int errorStatucCode)
        {
            this.ErrorStatusCode = errorStatucCode;
        }

        public int ErrorStatusCode { get; }

        public bool IsSucessful()
        {
            return this.isSuccessful;
        }

        public static readonly ServiceResult Successfull = new ServiceResult();
    }
}

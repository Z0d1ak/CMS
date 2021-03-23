using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Tests.Helpers
{
    public class ResponseWrapper<TResposeDto>
    {
        public ResponseWrapper(HttpStatusCode statusCode, TResposeDto content = default)
        {
            this.StatusCode = (int)statusCode;
            this.Content = content!;
        }

        public ResponseWrapper(int statusCode, TResposeDto content = default)
        {
            this.StatusCode = statusCode;
            this.Content = content!;
        }

        public TResposeDto Content { get; }


        public int StatusCode { get; set; }
    }

}

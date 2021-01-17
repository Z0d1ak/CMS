using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Services
{
    public interface ICompanyIdProvider
    {
        Guid CompanyID { get; set; }
    }
}

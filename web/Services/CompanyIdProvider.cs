using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Services
{
    /// <summary>
    /// Провайдера, который хранит инентификатор компании (тенанта),
    /// в контексте которой происходит запрос в текущей сессии.
    /// </summary>
    public class CompanyIdProvider : ICompanyIdProvider
    {
        private Guid? companyId;

        public CompanyIdProvider() { }

        public Guid CompanyId
        {
            get
            {
                if(this.companyId is null)
                {
                    throw new Exception();
                }

                return this.companyId.Value;
            }
            set
            {
                this.companyId = value;
            }
        }
    }
}

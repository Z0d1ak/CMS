using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Services
{
    public class CompanyIdProvider : ICompanyIdProvider
    {
        private Guid? companyID;
        public CompanyIdProvider() { }

        public Guid CompanyID
        {
            get
            {
                if(this.companyID is null)
                {
                    throw new Exception();
                }

                return this.companyID.Value;
            }
            set
            {
                this.companyID = value;
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace web.Services
{
    /// <summary>
    /// Провайдера, который хранит инентификатор компании (тенанта),
    /// в контексте которой происходит запрос в текущей сессии.
    /// </summary>
    public class UserInfoProvider : IUserInfoProvider
    {
        public UserInfoProvider(IHttpContextAccessor httpContextAccessor)
        {
            var context = httpContextAccessor.HttpContext;
            if (context is not null && context.Request.Headers.ContainsKey("Authorization"))
            {
                this.User = context.User;
                this.UserId = Guid.Parse(this.User.Claims.First(x => x.Type == "UserId").Value);
                this.CompanyId = Guid.Parse(this.User.Claims.First(x => x.Type == "CompanyId").Value);
            }
            else
            {
                this.User = new ClaimsPrincipal();
            }
        }

        public ClaimsPrincipal User { get; }

        public Guid CompanyId { get; }

        public Guid UserId { get;}
    }
}

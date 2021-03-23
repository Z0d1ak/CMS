using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace web.Services
{
    /// <summary>
    /// Интерфейс провайдера, который хранит инентификатор компании (тенанта),
    /// в контексте которой происходит запрос в текущей сессии.
    /// </summary>
    public interface IUserInfoProvider
    {

        ClaimsPrincipal User { get; }

        Guid CompanyId { get; }

        Guid UserId { get; }
    }
}

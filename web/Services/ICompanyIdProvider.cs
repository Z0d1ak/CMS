using System;

namespace web.Services
{
    /// <summary>
    /// Интерфейс провайдера, который хранит инентификатор компании (тенанта),
    /// в контексте которой происходит запрос в текущей сессии.
    /// </summary>
    public interface ICompanyIdProvider
    {
        /// <summary>
        /// Id компании (тенанта).
        /// </summary>
        Guid CompanyId { get; set; }
    }
}

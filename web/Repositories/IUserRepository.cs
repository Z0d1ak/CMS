using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using web.Entities;

namespace web.Repositories
{
    public interface IUserRepository
    {
        Task<User> FindUserByEmailAsync(string email, CancellationToken cancellationToken = default);
    }
}

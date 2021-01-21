using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using web.Db;
using web.Entities;

namespace web.Repositories
{
    public class UserRepository
        : IUserRepository
    {
        private readonly DataContext db;

        public UserRepository(DataContext db)
        {
            this.db = db;
        }

        public Task<User> FindUserByEmailAsync(string email, CancellationToken cancellationToken = default)
        {
            return this.db.Users
                .IgnoreQueryFilters()
                .AsNoTracking()
                .Include(x => x.Roles)
                .FirstOrDefaultAsync(x => x.Email == email, cancellationToken);
        }
    }
}

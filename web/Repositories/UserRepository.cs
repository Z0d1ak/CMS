using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using web.Db;
using web.Dto;
using web.Entities;
using web.Other.SearchParameters;
using web.Services;

namespace web.Repositories
{
    public class UserRepository
        : IUserRepository
    {
        private readonly DataContext dataContext;
        private readonly IUserInfoProvider userInfoProvider;

        public UserRepository(
            DataContext dataContext,
            IUserInfoProvider userInfoProvider)
        {
            this.dataContext = dataContext;
            this.userInfoProvider = userInfoProvider;
        }

        public async Task<UserDto?> CreateAsync(CreateUserDto createUserDto, CancellationToken cancellationToken = default)
        {
            using var hmac = new HMACSHA512();
            var user = new User
            {
                Id = createUserDto.Id,
                FirstName = createUserDto.FirstName,
                LastName = createUserDto.LastName,
                Email = createUserDto.Email,
                CompanyId = this.userInfoProvider.CompanyId,
                PasswordSalt = hmac.Key,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(createUserDto.Password))
            };

            if (createUserDto.Roles is not null)
            {
                user.Roles = await this.dataContext.Roles.Where(x => createUserDto.Roles.Contains(x.Type.ToString())).ToListAsync(cancellationToken);
            }

            this.dataContext.Users.Add(user);

            var changes = await this.dataContext.SaveChangesAsync(cancellationToken);

            if(changes == 0)
            {
                return null;
            }

            return user.ToDto();

        }

        public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            try
            {
                var user = new User()
                {
                    Id = id
                };

                this.dataContext.Entry(user).State = EntityState.Deleted;

                var changes = await this.dataContext.SaveChangesAsync(cancellationToken);

                if (changes == 0)
                {
                    return false;
                }
                return true;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }

        public async Task<IEnumerable<UserDto>> FindAsync(UserSearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            var users = await this.dataContext.Users
                .Include(x => x.Roles)
                .Where(x =>
                    (searchParameters.EmailStartsWith == null || x.Email.StartsWith(searchParameters.EmailStartsWith))
                    && (searchParameters.NameStartsWith == null || (x.FirstName + x.LastName).StartsWith(searchParameters.NameStartsWith))
                    && (searchParameters.Role == null || x.Roles.Any(x => x.Type.ToString() == searchParameters.Role)))
                .ToListAsync(cancellationToken);
            return users.Select(x => x.ToDto());
        }

        public Task<User> LoginAsync(string email, CancellationToken cancellationToken = default)
        {
            return this.dataContext.Users
                .IgnoreQueryFilters()
                .AsNoTracking()
                .Include(x => x.Roles)
                .FirstOrDefaultAsync(x => x.Email == email, cancellationToken);
        }

        public async ValueTask<UserDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var user = await this.dataContext.Users
                    .Include(x => x.Roles)
                    .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
            return user?.ToDto();
        }

        public async Task<bool> UpdateAsync(StoreUserDto storeUserDto, CancellationToken cancellationToken = default)
        {
            try
            {
                var user = await this.dataContext.Users
                    .Include(x => x.Roles)
                    .FirstOrDefaultAsync(x => x.Id == storeUserDto.Id, cancellationToken);
                if(user is null)
                {
                    return false;
                }

                user.Email = storeUserDto.Email;
                user.FirstName = storeUserDto.FirstName;
                user.LastName = storeUserDto.LastName;

                if (storeUserDto.Password is not null)
                {
                    using var hmac = new HMACSHA512();
                    user.PasswordSalt = hmac.Key;
                    user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(storeUserDto.Password));

                }

                if (storeUserDto.Roles is not null)
                {
                    user.Roles = await this.dataContext.Roles
                        .Where(x => storeUserDto.Roles.Contains((string)(object)x.Type))
                        .ToListAsync();
                }

                var changes = await this.dataContext.SaveChangesAsync(cancellationToken);

                if (changes == 0)
                {
                    return false;
                }
                return true;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using web.Dto;
using web.Entities;
using web.Other.SearchParameters;

namespace web.Repositories
{
    public interface IUserRepository
    {
        Task<User> LoginAsync(string email, CancellationToken cancellationToken = default);

        Task<UserDto?> CreateAsync(CreateUserDto createUserDto, CancellationToken cancellationToken = default);

        ValueTask<UserDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<IEnumerable<UserDto>> FindAsync(UserSearchParameters searchParameters, CancellationToken cancellationToken = default);

        Task<bool> UpdateAsync(StoreUserDto storeUserDto, CancellationToken cancellationToken = default);

        Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}

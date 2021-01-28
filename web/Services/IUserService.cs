using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using web.Dto;
using web.Other;
using web.Other.SearchParameters;

namespace web.Services
{
    public interface IUserService
    {
        Task<ServiceResult<UserDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<ServiceResult<SearchResponseDto<UserDto>>> FindAsync(UserSearchParameters searchParameters, CancellationToken cancellationToken = default);

        Task<ServiceResult<UserDto>> CreateAsync(CreateUserDto createUserDto, CancellationToken cancellationToken = default);

        Task<ServiceResult> UpdateAsync(StoreUserDto storeUserDto, CancellationToken cancellationToken = default);

        Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}

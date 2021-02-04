using System;
using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Other;

namespace web.Repositories
{
    public interface IUserRepository
    {
        Task<ServiceResult<ResponseUserDto>> CreateAsync(CreateUserDto createUserDto, CancellationToken cancellationToken = default);

        Task<ServiceResult<ResponseUserDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<ServiceResult<SearchResponseDto<ResponseUserDto>>> FindAsync(UserSearchParameters searchParameters, CancellationToken cancellationToken = default);

        Task<ServiceResult> UpdateAsync(StoreUserDto storeUserDto, CancellationToken cancellationToken = default);

        Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}

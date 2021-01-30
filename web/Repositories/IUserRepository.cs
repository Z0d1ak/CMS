using System;
using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;

namespace web.Repositories
{
    public interface IUserRepository
    {
        Task<ResponseUserDto?> CreateAsync(CreateUserDto createUserDto, CancellationToken cancellationToken = default);

        ValueTask<ResponseUserDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<SearchResponseDto<ResponseUserDto>> FindAsync(UserSearchParameters searchParameters, CancellationToken cancellationToken = default);

        Task<bool> UpdateAsync(StoreUserDto storeUserDto, CancellationToken cancellationToken = default);

        Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}

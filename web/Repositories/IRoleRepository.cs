using System;
using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;

namespace web.Repositories
{
    public interface IRoleRepository
    {
        ValueTask<ResponseRoleDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<SearchResponseDto<ResponseRoleDto>> FindAsync(RoleSearchParameters searchParameters, CancellationToken cancellationToken = default);

        Task<bool> UpdateAsync(StoreRoleDto roleDto, CancellationToken cancellationToken = default);
    }
}

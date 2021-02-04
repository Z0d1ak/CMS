using System;
using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Other;

namespace web.Repositories
{
    public interface IRoleRepository
    {
        ValueTask<ServiceResult<ResponseRoleDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<ServiceResult<SearchResponseDto<ResponseRoleDto>>> FindAsync(RoleSearchParameters searchParameters, CancellationToken cancellationToken = default);

        Task<ServiceResult> UpdateAsync(StoreRoleDto roleDto, CancellationToken cancellationToken = default);
    }
}

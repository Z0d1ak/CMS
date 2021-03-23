using System;
using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Other;

namespace web.Services
{
    public interface IRoleService
    {
        Task<ServiceResult<ResponseRoleDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<ServiceResult<SearchResponseDto<ResponseRoleDto>>> FindAsync(RoleSearchParameters roleSearchParameters, CancellationToken cancellationToken = default);

        Task<ServiceResult> UpdateAsync(StoreRoleDto storeRoleDto, CancellationToken cancellationToken = default);
    }
}

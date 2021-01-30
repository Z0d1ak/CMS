using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using web.Dto;
using web.Other;
using web.Other.SearchParameters;
using web.Dto.Request;
using web.Dto.Response;

namespace web.Services
{
    public interface IRoleService
    {
        Task<ServiceResult<ResponseRoleDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<ServiceResult<SearchResponseDto<ResponseRoleDto>>> FindAsync(RoleSearchParameters roleSearchParameters, CancellationToken cancellationToken = default);

        Task<ServiceResult> UpdateAsync(StoreRoleDto storeRoleDto, CancellationToken cancellationToken = default);
    }
}

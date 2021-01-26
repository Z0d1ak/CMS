using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using web.Dto;
using web.Other;
using web.Other.SearchParameters;

namespace web.Services
{
    public interface IRoleService
    {
        Task<ServiceResult<RoleDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<ServiceResult<IEnumerable<RoleDto>>> FindAsync(RoleSearchParameters roleSearchParameters, CancellationToken cancellationToken = default);

        Task<ServiceResult> UpdateAsync(RoleDto roleDto, CancellationToken cancellationToken = default);
    }
}

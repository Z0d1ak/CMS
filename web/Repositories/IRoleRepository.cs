using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using web.Dto;
using web.Other.SearchParameters;
using web.Dto.Request;
using web.Dto.Response;

namespace web.Repositories
{
    public interface IRoleRepository
    {
        ValueTask<ResponseRoleDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<SearchResponseDto<ResponseRoleDto>> FindAsync(RoleSearchParameters searchParameters, CancellationToken cancellationToken = default);

        Task<bool> UpdateAsync(StoreRoleDto roleDto, CancellationToken cancellationToken = default);
    }
}

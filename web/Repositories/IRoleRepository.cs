using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using web.Dto;
using web.Other.SearchParameters;

namespace web.Repositories
{
    public interface IRoleRepository
    {
        ValueTask<RoleDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        Task<SearchResponseDto<RoleDto>> FindAsync(RoleSearchParameters searchParameters, CancellationToken cancellationToken = default);

        Task<bool> UpdateAsync(RoleDto roleDto, CancellationToken cancellationToken = default);
    }
}

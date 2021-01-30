using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Other;
using web.Repositories;

namespace web.Services
{
    public class RoleService : IRoleService
    {
        #region Private Fields

        private readonly IRoleRepository roleRepository;

        #endregion

        #region Constructor

        public RoleService(IRoleRepository roleRepository)
        {
            this.roleRepository = roleRepository;
        }

        #endregion

        #region Public Methods

        public async Task<ServiceResult<SearchResponseDto<ResponseRoleDto>>> FindAsync(RoleSearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            return await this.roleRepository.FindAsync(searchParameters, cancellationToken);
        }

        public async Task<ServiceResult<ResponseRoleDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await this.roleRepository.GetByIdAsync(id, cancellationToken);
        }

        public async Task<ServiceResult> UpdateAsync(StoreRoleDto roleDto, CancellationToken cancellationToken = default)
        {
            return await this.roleRepository.UpdateAsync(roleDto, cancellationToken);
        }

        #endregion
    }
}

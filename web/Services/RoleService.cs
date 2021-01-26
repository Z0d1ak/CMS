using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using web.Dto;
using web.Other;
using web.Other.SearchParameters;
using web.Repositories;

namespace web.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            this.roleRepository = roleRepository;
        }

        public async Task<ServiceResult<IEnumerable<RoleDto>>> FindAsync(RoleSearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            var companyDtos = await this.roleRepository.FindAsync(searchParameters, cancellationToken);

            return new ServiceResult<IEnumerable<RoleDto>>(companyDtos);
        }

        public async Task<ServiceResult<RoleDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var roleDto = await this.roleRepository.GetByIdAsync(id, cancellationToken);
            if (roleDto is null)
            {
                return new ServiceResult<RoleDto>(StatusCodes.Status404NotFound);
            }

            return new ServiceResult<RoleDto>(roleDto);
        }

        public async Task<ServiceResult> UpdateAsync(RoleDto roleDto, CancellationToken cancellationToken = default)
        {
            bool isUpdated = await this.roleRepository.UpdateAsync(roleDto, cancellationToken);

            if (!isUpdated)
            {
                return new ServiceResult(StatusCodes.Status404NotFound);
            }

            return ServiceResult.Successfull;
        }
    }
}

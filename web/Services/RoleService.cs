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
        private readonly IRoleRepository roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            this.roleRepository = roleRepository;
        }

        public async Task<ServiceResult<SearchResponseDto<ResponseRoleDto>>> FindAsync(RoleSearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            var companyDtos = await this.roleRepository.FindAsync(searchParameters, cancellationToken);

            return new ServiceResult<SearchResponseDto<ResponseRoleDto>>(companyDtos);
        }

        public async Task<ServiceResult<ResponseRoleDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var roleDto = await this.roleRepository.GetByIdAsync(id, cancellationToken);
            if (roleDto is null)
            {
                return new ServiceResult<ResponseRoleDto>(StatusCodes.Status404NotFound);
            }

            return new ServiceResult<ResponseRoleDto>(roleDto);
        }

        public async Task<ServiceResult> UpdateAsync(StoreRoleDto roleDto, CancellationToken cancellationToken = default)
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

using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Options;
using web.Other;
using web.Repositories;

namespace web.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IUserInfoProvider userInfoProvider;

        public UserService(
            IUserRepository userRepository,
            IUserInfoProvider userInfoProvider)
        {
            this.userRepository = userRepository;
            this.userInfoProvider = userInfoProvider;
        }


        public async Task<ServiceResult<ResponseUserDto>> CreateAsync(CreateUserDto createUserDto, CancellationToken cancellationToken = default)
        {
            var userDto = await this.userRepository.CreateAsync(createUserDto, cancellationToken);

            if (userDto is null)
            {
                return new ServiceResult<ResponseUserDto>(StatusCodes.Status409Conflict);
            }

            return new ServiceResult<ResponseUserDto>(userDto);
        }

        public async Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var isDeleted = await this.userRepository.DeleteAsync(id, cancellationToken);

            if (!isDeleted)
            {
                return new ServiceResult(StatusCodes.Status404NotFound);
            }

            return ServiceResult.Successfull;
        }

        public async Task<ServiceResult<SearchResponseDto<ResponseUserDto>>> FindAsync(UserSearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            var userDtos = await this.userRepository.FindAsync(searchParameters, cancellationToken);

            return new ServiceResult<SearchResponseDto<ResponseUserDto>>(userDtos);
        }

        public async Task<ServiceResult<ResponseUserDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var userDto = await this.userRepository.GetByIdAsync(id, cancellationToken);
            if (userDto is null)
            {
                return new ServiceResult<ResponseUserDto>(StatusCodes.Status404NotFound);
            }

            return new ServiceResult<ResponseUserDto>(userDto);
        }

        public async Task<ServiceResult> UpdateAsync(StoreUserDto storeUserDto, CancellationToken cancellationToken = default)
        {
            if (this.userInfoProvider.UserId != storeUserDto.Id
                && !this.userInfoProvider.User.IsInRole(AccessRoles.CompanyAdmin)
                && !this.userInfoProvider.User.IsInRole(AccessRoles.SuperAdmin))
            {
                return new ServiceResult(StatusCodes.Status403Forbidden);
            }
            
            if (storeUserDto.Roles is not null
                && !this.userInfoProvider.User.IsInRole(AccessRoles.CompanyAdmin)
                && !this.userInfoProvider.User.IsInRole(AccessRoles.SuperAdmin))
            {
                return new ServiceResult(StatusCodes.Status403Forbidden);
            }

            bool isUpdated = await this.userRepository.UpdateAsync(storeUserDto, cancellationToken);

            if (!isUpdated)
            {
                return new ServiceResult(StatusCodes.Status404NotFound);
            }

            return ServiceResult.Successfull;
        }
    }
}

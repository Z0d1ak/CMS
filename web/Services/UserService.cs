using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using web.Dto;
using web.Options;
using web.Other;
using web.Other.SearchParameters;
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


        public async Task<ServiceResult<UserDto>> CreateAsync(CreateUserDto createUserDto, CancellationToken cancellationToken = default)
        {
            var userDto = await this.userRepository.CreateAsync(createUserDto, cancellationToken);

            if (userDto is null)
            {
                return new ServiceResult<UserDto>(StatusCodes.Status409Conflict);
            }

            return new ServiceResult<UserDto>(userDto);
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

        public async Task<ServiceResult<IEnumerable<UserDto>>> FindAsync(UserSearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            var userDtos = await this.userRepository.FindAsync(searchParameters, cancellationToken);

            return new ServiceResult<IEnumerable<UserDto>>(userDtos);
        }

        public async Task<ServiceResult<UserDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var userDto = await this.userRepository.GetByIdAsync(id, cancellationToken);
            if (userDto is null)
            {
                return new ServiceResult<UserDto>(StatusCodes.Status404NotFound);
            }

            return new ServiceResult<UserDto>(userDto);
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

            if (storeUserDto.Password is not null
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

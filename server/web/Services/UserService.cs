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
        #region Private Fields

        private readonly IUserRepository userRepository;
        private readonly IUserInfoProvider userInfoProvider;

        #endregion

        #region Constructor

        public UserService(
            IUserRepository userRepository,
            IUserInfoProvider userInfoProvider)
        {
            this.userRepository = userRepository;
            this.userInfoProvider = userInfoProvider;
        }

        #endregion

        #region Public Methods

        public async Task<ServiceResult<ResponseUserDto>> CreateAsync(CreateUserDto createUserDto, CancellationToken cancellationToken = default)
        {
            return await this.userRepository.CreateAsync(createUserDto, cancellationToken);
        }

        public async Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            if(userInfoProvider.UserId == id)
            {
                return new ServiceResult(StatusCodes.Status405MethodNotAllowed);
            }
            return await this.userRepository.DeleteAsync(id, cancellationToken);
        }

        public async Task<ServiceResult<SearchResponseDto<ResponseUserDto>>> FindAsync(UserSearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            return await this.userRepository.FindAsync(searchParameters, cancellationToken);
        }

        public async Task<ServiceResult<ResponseUserDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await this.userRepository.GetByIdAsync(id, cancellationToken);
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

            return await this.userRepository.UpdateAsync(storeUserDto, cancellationToken);
        }

        #endregion
    }
}

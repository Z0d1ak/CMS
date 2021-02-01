using System;
using System.ComponentModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Contracts.SearchParameters;
using web.Contracts.SearchParameters.SortingColumns;
using web.Db;
using web.Entities;
using web.Other;
using web.Repositories.Helpers;
using web.Services;

namespace web.Repositories
{
    public class UserRepository
        : IUserRepository
    {
        #region Private Fields

        private readonly DataContext dataContext;
        private readonly IUserInfoProvider userInfoProvider;
        private readonly IPasswordService passwordService;

        #endregion

        #region Constructor

        public UserRepository(
            DataContext dataContext,
            IUserInfoProvider userInfoProvider,
            IPasswordService passwordService)
        {
            this.dataContext = dataContext;
            this.userInfoProvider = userInfoProvider;
            this.passwordService = passwordService;
        }

        #endregion

        #region Public Methods

        public async Task<ServiceResult<ResponseUserDto>> CreateAsync(CreateUserDto createUserDto, CancellationToken cancellationToken = default)
        {
            try
            {
                var user = new User
                {
                    Id = createUserDto.Id,
                    FirstName = createUserDto.FirstName,
                    LastName = createUserDto.LastName,
                    Email = createUserDto.Email,
                    CompanyId = this.userInfoProvider.CompanyId
                };
                (user.PasswordHash, user.PasswordSalt) =
                    await this.passwordService.CreatePasswordHashAsync(createUserDto.Password, cancellationToken);

                if (createUserDto.Roles is not null)
                {
                    user.Roles = await this.dataContext.Roles.Where(x => createUserDto.Roles.Contains(x.Type)).ToListAsync(cancellationToken);
                }

                this.dataContext.Users.Add(user);

                var changes = await this.dataContext.SaveChangesAsync(cancellationToken);

                if (changes == 0)
                {
                    return new ServiceResult<ResponseUserDto>(StatusCodes.Status409Conflict);
                }

                return new ServiceResult<ResponseUserDto>(user.ToResponseDto());
            }
            catch (DbUpdateException)
            {
                return new ServiceResult<ResponseUserDto>(StatusCodes.Status409Conflict);
            }

        }

        public async Task<ServiceResult> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            try
            {
                var user = new User()
                {
                    Id = id
                };

                this.dataContext.Entry(user).State = EntityState.Deleted;

                var changes = await this.dataContext.SaveChangesAsync(cancellationToken);

                if (changes == 0)
                {
                    return new ServiceResult(StatusCodes.Status404NotFound);
                }
                return ServiceResult.Successfull;
            }
            catch (DbUpdateException)
            {
                return new ServiceResult(StatusCodes.Status404NotFound);
            }
        }

        public async Task<ServiceResult<SearchResponseDto<ResponseUserDto>>> FindAsync(UserSearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            var selectQuery = this.dataContext.Users
                .AsNoTracking();

            if (searchParameters.QuickSearch != null)
            {
                selectQuery = selectQuery.Where(x => 
                    x.Email.StartsWith(searchParameters.QuickSearch)
                    || x.FirstName.StartsWith(searchParameters.QuickSearch)
                    || x.LastName.StartsWith(searchParameters.QuickSearch)
                    );
            }
            else
            {
                selectQuery = selectQuery.Where(x =>
                    (searchParameters.FirstNameStartsWith == null || x.FirstName.StartsWith(searchParameters.FirstNameStartsWith))
                    && (searchParameters.LastNameStartsWith == null || x.LastName.StartsWith(searchParameters.LastNameStartsWith))
                    && (searchParameters.EmailStartsWith == null || x.Email.StartsWith(searchParameters.EmailStartsWith))
                    && (searchParameters.Role == null || x.Roles.Any(x => x.Type == searchParameters.Role))
                    );
            }

            if (searchParameters.SortingColumn is not null)
            {
                switch (searchParameters.SortDirection)
                {
                    case ListSortDirection.Ascending:
                        switch (searchParameters.SortingColumn)
                        {
                            case UserSortingColumn.FirstName:
                                selectQuery = selectQuery.OrderBy(x => x.FirstName);
                                break;
                            case UserSortingColumn.LastName:
                                selectQuery = selectQuery.OrderBy(x => x.LastName);
                                break;
                            case UserSortingColumn.Email:
                                selectQuery = selectQuery.OrderBy(x => x.Email);
                                break;
                        }
                        break;
                    case ListSortDirection.Descending:
                        switch (searchParameters.SortingColumn)
                        {
                            case UserSortingColumn.FirstName:
                                selectQuery = selectQuery.OrderByDescending(x => x.FirstName);
                                break;
                            case UserSortingColumn.LastName:
                                selectQuery = selectQuery.OrderByDescending(x => x.LastName);
                                break;
                            case UserSortingColumn.Email:
                                selectQuery = selectQuery.OrderByDescending(x => x.Email);
                                break;
                        }
                        break;
                }
            }

            selectQuery = selectQuery
                .Skip((searchParameters.PageNumber - 1) * searchParameters.PageLimit)
                .Take(searchParameters.PageLimit);

            var users = await selectQuery
                .Select(Converters.ToResponseUserDtoExpression)
                .ToListAsync(cancellationToken);
            var count = await selectQuery.CountAsync(cancellationToken);

            var searchResponse = new SearchResponseDto<ResponseUserDto>(count, users);
            return new ServiceResult<SearchResponseDto<ResponseUserDto>>(searchResponse);
        }

        public async Task<ServiceResult<ResponseUserDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var user = await this.dataContext.Users
                    .Include(x => x.Roles)
                    .Where(x => x.Id == id)
                    .Select(Converters.ToResponseUserDtoExpression)
                    .FirstOrDefaultAsync(cancellationToken);

            if (user is null)
            {
                return new ServiceResult<ResponseUserDto>(StatusCodes.Status404NotFound);
            }
            return new ServiceResult<ResponseUserDto>(user);
        }

        public async Task<ServiceResult> UpdateAsync(StoreUserDto storeUserDto, CancellationToken cancellationToken = default)
        {
            try
            {
                var user = await this.dataContext.Users
                    .Include(x => x.Roles)
                    .FirstOrDefaultAsync(x => x.Id == storeUserDto.Id, cancellationToken);
                if(user is null)
                {
                    return new ServiceResult(StatusCodes.Status404NotFound);
                }

                user.Email = storeUserDto.Email;
                user.FirstName = storeUserDto.FirstName;
                user.LastName = storeUserDto.LastName;

                if (storeUserDto.Password is not null)
                {
                    (user.PasswordHash, user.PasswordSalt) =
                        await this.passwordService.CreatePasswordHashAsync(storeUserDto.Password, cancellationToken);
                }

                if (storeUserDto.Roles is not null)
                {
                    user.Roles = await this.dataContext.Roles
                        .Where(x => storeUserDto.Roles.Contains(x.Type))
                        .ToListAsync(cancellationToken);
                }

                var changes = await this.dataContext.SaveChangesAsync(cancellationToken);

                if (changes == 0)
                {
                    return new ServiceResult(StatusCodes.Status404NotFound);
                }
                return ServiceResult.Successfull;
            }
            catch (DbUpdateException)
            {
                return new ServiceResult(StatusCodes.Status404NotFound);
            }
        }

        #endregion
    }
}

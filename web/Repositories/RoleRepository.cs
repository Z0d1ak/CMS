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

namespace web.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        #region Private Methods

        private readonly DataContext dataContext;

        #endregion

        #region Constructor

        public RoleRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        #endregion

        #region Public Methods

        public async Task<ServiceResult<SearchResponseDto<ResponseRoleDto>>> FindAsync(RoleSearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            var selectQuery = this.dataContext.Roles
                .AsNoTracking();

            if (searchParameters.QuickSearch != null)
            {
                selectQuery = selectQuery.Where(x =>
                    x.Name.StartsWith(searchParameters.QuickSearch));
            }
            else
            {
                selectQuery = selectQuery.Where(x =>
                    searchParameters.NameStartsWith == null || x.Name.StartsWith(searchParameters.NameStartsWith));
            }

            if (searchParameters.SortingColumn is not null)
            {
                switch (searchParameters.SortDirection)
                {
                    case ListSortDirection.Ascending:
                        switch (searchParameters.SortingColumn)
                        {
                            case RoleSortingColumn.Name:
                                selectQuery = selectQuery.OrderBy(x => x.Name);
                                break;
                            case RoleSortingColumn.Type:
                                selectQuery = selectQuery.OrderBy(x => x.Type);
                                break;
                        }
                        break;
                    case ListSortDirection.Descending:
                        switch (searchParameters.SortingColumn)
                        {
                            case RoleSortingColumn.Name:
                                selectQuery = selectQuery.OrderByDescending(x => x.Name);
                                break;
                            case RoleSortingColumn.Type:
                                selectQuery = selectQuery.OrderByDescending(x => x.Type);
                                break;
                        }
                        break;
                }
            }

            selectQuery = selectQuery
                .Skip((searchParameters.PageNumber - 1) * searchParameters.PageLimit)
                .Take(searchParameters.PageLimit);

            var roles = await selectQuery
                .Select(Converters.ToResponseRoleDtoExpression)
                .ToListAsync(cancellationToken);
            var count = await selectQuery.CountAsync(cancellationToken);

            var searchResponse = new SearchResponseDto<ResponseRoleDto>(count, roles);
            return new ServiceResult<SearchResponseDto<ResponseRoleDto>>(searchResponse);
        }

        public async ValueTask<ServiceResult<ResponseRoleDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var role = await this.dataContext.Roles.FindAsync(new object[] { id }, cancellationToken);

            if(role is null)
            {
                return new ServiceResult<ResponseRoleDto>(StatusCodes.Status404NotFound);
            }
            return new ServiceResult<ResponseRoleDto>(role.ToResponseDto());
        }

        public async Task<ServiceResult> UpdateAsync(StoreRoleDto roleDto, CancellationToken cancellationToken = default)
        {
            var role = new Role
            {
                Id = roleDto.Id,
                Name = roleDto.Name
            };

            try
            {
                this.dataContext.Attach(role);
                this.dataContext.Entry(role).Property(x => x.Name).IsModified = true;

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

﻿using System;
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
        private readonly ISqlExceptionConverter sqlExceptionConverter;

        #endregion

        #region Constructor

        public RoleRepository(
            DataContext dataContext,
            ISqlExceptionConverter sqlExceptionConverter)
        {
            this.dataContext = dataContext;
            this.sqlExceptionConverter = sqlExceptionConverter;
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

            var count = await selectQuery.CountAsync(cancellationToken);
            var roles = await selectQuery
                .Skip((searchParameters.PageNumber - 1) * searchParameters.PageLimit)
                .Take(searchParameters.PageLimit)
                .Select(Mappers.ToResponseRoleDtoExpression)
                .ToListAsync(cancellationToken);

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
            this.dataContext.Attach(role);
            this.dataContext.Entry(role).Property(x => x.Name).IsModified = true;

            try
            {
                await this.dataContext.SaveChangesAsync(cancellationToken);
                return ServiceResult.Successfull;
            }
            catch (DbUpdateException dbUpdateException)
            {
                var errorCode = this.sqlExceptionConverter.Convert(dbUpdateException);
                if (errorCode is null)
                {
                    throw;
                }
                return new ServiceResult(errorCode.Value);
            }
        }

        #endregion
    }
}

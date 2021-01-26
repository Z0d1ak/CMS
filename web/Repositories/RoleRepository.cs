using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using web.Db;
using web.Dto;
using web.Entities;
using web.Other.SearchParameters;

namespace web.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext dataContext;

        public RoleRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<IEnumerable<RoleDto>> FindAsync(RoleSearchParameters searchParameters, CancellationToken cancellationToken = default)
        {
            var roles = await this.dataContext.Roles
                .Where(x =>
                   (searchParameters.StartsWith == null || x.Name.StartsWith(searchParameters.StartsWith)))
                .ToListAsync(cancellationToken);
            return roles.Select(x => x.ToDto());
        }

        public async ValueTask<RoleDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var role = await this.dataContext.Roles.FindAsync(new object[] { id }, cancellationToken);
            return role?.ToDto();
        }

        public async Task<bool> UpdateAsync(RoleDto roleDto, CancellationToken cancellationToken = default)
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
                    return false;
                }
                return true;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }
    }
}

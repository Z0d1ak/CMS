using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using web.Entities;

namespace web.Db
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Company> Companies { get; set; }

        public DbSet<CompletedTask> TaskHistory { get; set; }

        public DbSet<ActiveTask> ActiveTasks { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Article> Articles { get; set; }

        public DataContext()
        {
            this.Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.
        }
    }
}

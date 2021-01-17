using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using web.Entities;
using web.Services;

namespace web.Db
{
    public class DataContext : DbContext
    {
        private readonly ICompanyIdProvider companyIdProvider;

        public DbSet<User> Users { get; set; }

        public DbSet<Company> Companies { get; set; }

        public DbSet<WfTask> Tasks { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Article> Articles { get; set; }

        public DataContext(
            DbContextOptions<DataContext> options,
            ICompanyIdProvider companyIdProvider)
            : base(options)
        {
            //this.Database.EnsureCreated();
            this.companyIdProvider = companyIdProvider;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ConfigureArticleEntity(modelBuilder);
            ConfigureRoleEntity(modelBuilder);
            ConfigureUserEntity(modelBuilder);
            ConfigureCompanyEntity(modelBuilder);
            ConfigureWfTaskEntity(modelBuilder);
        }

        private void ConfigureArticleEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Article>().HasKey(x => x.Id);
            modelBuilder.Entity<Article>().Property(x => x.CompanyID).IsRequired();
            
            modelBuilder.Entity<Article>().HasQueryFilter(x => x.CompanyID == this.companyIdProvider.CompanyID);

            modelBuilder.Entity<Article>().HasOne(x => x.Initiator)
                .WithMany(x => x.InitiatedArticles)
                .HasForeignKey(x => x.InitiatorID);

            modelBuilder.Entity<Article>().Property(x => x.CreationDate).IsRequired();
            modelBuilder.Entity<Article>().Property(x => x.InitiatorID).IsRequired();
            modelBuilder.Entity<Article>().Property(x => x.State).IsRequired();
            modelBuilder.Entity<Article>().Property(x => x.Title).IsRequired().HasMaxLength(256);
            modelBuilder.Entity<Article>().Property(x => x.Content).HasColumnType("jsonb");
            modelBuilder.Entity<Article>().Property(x => x.State)
                .IsRequired()
                .HasConversion(new EnumToStringConverter<ArticleState>());

            modelBuilder.Entity<Article>().ToTable("articles");

            modelBuilder.Entity<Article>()
                .HasOne(x => x.Company)
                .WithMany(x => x.Articles)
                .HasForeignKey(x => x.CompanyID)
                .OnDelete(DeleteBehavior.Cascade);
        }

        private void ConfigureRoleEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasKey(x => x.Id);
            modelBuilder.Entity<Role>().Property(x => x.CompanyID).IsRequired();

            modelBuilder.Entity<Role>().HasQueryFilter(x => x.CompanyID == this.companyIdProvider.CompanyID);

            modelBuilder.Entity<Role>().Property(x => x.Name).IsRequired().HasMaxLength(32);
            modelBuilder.Entity<Role>().Property(x => x.Type)
                .IsRequired()
                .HasConversion(new EnumToStringConverter<RoleType>());


            modelBuilder.Entity<Role>().ToTable("roles");

            modelBuilder.Entity<Role>()
                .HasOne(x => x.Company)
                .WithMany(x => x.Roles)
                .HasForeignKey(x => x.CompanyID)
                .OnDelete(DeleteBehavior.Cascade);

        }

        private void ConfigureUserEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(x => x.Id);
            modelBuilder.Entity<User>().Property(x => x.CompanyID).IsRequired();

            modelBuilder.Entity<User>().HasQueryFilter(x => x.CompanyID == this.companyIdProvider.CompanyID);

            modelBuilder.Entity<User>().ToTable("users");

            modelBuilder.Entity<User>().Property(x => x.PasswordHash).IsRequired();
            modelBuilder.Entity<User>().Property(x => x.PasswordSalt).IsRequired();
            modelBuilder.Entity<User>().Property(x => x.Login).IsRequired().HasMaxLength(32);
            modelBuilder.Entity<User>().Property(x => x.Email).IsRequired().HasMaxLength(32);
            modelBuilder.Entity<User>().Property(x => x.FirstName).IsRequired().HasMaxLength(32);
            modelBuilder.Entity<User>().Property(x => x.LastName).HasMaxLength(32);


            modelBuilder.Entity<User>()
                .HasOne(x => x.Company)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.CompanyID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(x => x.Roles)
                .WithMany(x => x.Users);
        }

        private void ConfigureCompanyEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>().HasKey(x => x.Id);

            modelBuilder.Entity<Company>().Property(x => x.Name).IsRequired().HasMaxLength(64);

            modelBuilder.Entity<Company>().ToTable("companies");
        }

        private void ConfigureWfTaskEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WfTask>().HasKey(x => x.Id);
            modelBuilder.Entity<WfTask>().Property(x => x.CompanyID).IsRequired();

            modelBuilder.Entity<WfTask>().HasQueryFilter(x => x.CompanyID == this.companyIdProvider.CompanyID);


            modelBuilder.Entity<WfTask>().Property(x => x.AuthorId).IsRequired();
            modelBuilder.Entity<WfTask>().Property(x => x.ArticleID).IsRequired();
            modelBuilder.Entity<WfTask>().Property(x => x.CreationDate).IsRequired();
            modelBuilder.Entity<WfTask>().Property(x => x.Comment).HasMaxLength(512);
            modelBuilder.Entity<WfTask>().Property(x => x.Description).HasMaxLength(512);
            modelBuilder.Entity<WfTask>().Property(x => x.Type)
                .IsRequired()
                .HasConversion(new EnumToStringConverter<TaskType>());

            modelBuilder.Entity<WfTask>().ToTable("tasks");

            modelBuilder.Entity<WfTask>()
                .HasOne(x => x.Company)
                .WithMany(x => x.Tasks)
                .HasForeignKey(x => x.CompanyID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WfTask>()
                .HasOne(x => x.Author)
                .WithMany(x => x.CreatedTasks)
                .HasForeignKey(x => x.AuthorId);

            modelBuilder.Entity<WfTask>()
                .HasOne(x => x.Article)
                .WithMany(x => x.Tasks)
                .HasForeignKey(x => x.ArticleID);

            modelBuilder.Entity<WfTask>()
                .HasOne(x => x.Performer)
                .WithMany(x => x.PerfomingTasks)
                .HasForeignKey(x => x.PerformerId);

        }
    }
}

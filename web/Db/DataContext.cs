﻿using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using web.Entities;
using web.Services;

namespace web.Db
{
    /// <summary>
    /// Конекст данных.
    /// </summary>
    /// <remarks>
    /// Для сущностей по умолчанию есть фильтр по компании (теннату).
    /// </remarks>
    public class DataContext : DbContext
    {
        #region Private Fields

        private readonly IUserInfoProvider userInfoProvider;

        private readonly static Guid AdminGuid = new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f");

        #endregion

        #region Constructor

        public DataContext(
           DbContextOptions<DataContext> options,
           IUserInfoProvider userInfoProvider)
           : base(options)
        {
            this.Database.Migrate();
            this.userInfoProvider = userInfoProvider;
        }

        #endregion

        #region Public Properties

        public DbSet<User> Users { get; set; } = null!;

        public DbSet<Company> Companies { get; set; } = null!;

        public DbSet<WfTask> Tasks { get; set; } = null!;

        public DbSet<Role> Roles { get; set; } = null!;

        public DbSet<Article> Articles { get; set; } = null!;

        public DbSet<Data> Datas { get; set; } = null!;

        public DbSet<TelegrammData> TelegrammDatas { get; set; } = null!;

        public DbSet<PublishData> PublishDatas { get; set; } = null!;

        #endregion

        #region Base Overrides

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            this.ConfigureDataEntity(modelBuilder);
            this.ConfigureArticleEntity(modelBuilder);
            this.ConfigureRoleEntity(modelBuilder);
            this.ConfigureUserEntity(modelBuilder);
            this.ConfigureCompanyEntity(modelBuilder);
            this.ConfigureWfTaskEntity(modelBuilder);
            this.ConfigureSomeEntity(modelBuilder);

        }

        #endregion

        #region Private Methods

        private void ConfigureDataEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Data>().HasKey(x => x.Id);
            modelBuilder.Entity<Data>().Property(x => x.Extension).IsRequired();
        }

        private void ConfigureArticleEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Article>().HasKey(x => x.Id);
            modelBuilder.Entity<Article>().Property(x => x.CompanyId).IsRequired();
            
            modelBuilder.Entity<Article>().HasQueryFilter(x => x.CompanyId == this.userInfoProvider.CompanyId);

            modelBuilder.Entity<Article>().HasOne(x => x.Initiator)
                .WithMany(x => x.InitiatedArticles)
                .HasForeignKey(x => x.InitiatorId);

            modelBuilder.Entity<Article>().Property(x => x.CreationDate).IsRequired();
            modelBuilder.Entity<Article>().Property(x => x.InitiatorId).IsRequired();
            modelBuilder.Entity<Article>().Property(x => x.State).IsRequired();
            modelBuilder.Entity<Article>().Property(x => x.Title).IsRequired().HasMaxLength(256);
            modelBuilder.Entity<Article>().Property(x => x.Content);
            modelBuilder.Entity<Article>().Property(x => x.State)
                .IsRequired()
                .HasConversion(new EnumToStringConverter<ArticleState>());

            modelBuilder.Entity<Article>()
                .HasOne(x => x.Company)
                .WithMany(x => x.Articles)
                .HasForeignKey(x => x.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);
        }


        private void ConfigureSomeEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TelegrammData>().HasKey(x => x.Id);
            modelBuilder.Entity<TelegrammData>().Property(x => x.CompanyId).IsRequired();
            modelBuilder.Entity<TelegrammData>()
                .HasQueryFilter(x =>
                    this.userInfoProvider.CompanyId == AdminGuid
                    || this.userInfoProvider.CompanyId == x.CompanyId);
            modelBuilder.Entity<TelegrammData>()
                .HasOne(x => x.Company)
                .WithMany(x => x.TelegrammDatas)
                .HasForeignKey(x => x.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PublishData>().HasKey(x => x.Id);
            modelBuilder.Entity<PublishData>().Property(x => x.CompanyId).IsRequired();
            modelBuilder.Entity<PublishData>()
                .HasQueryFilter(x =>
                    this.userInfoProvider.CompanyId == AdminGuid
                    || this.userInfoProvider.CompanyId == x.CompanyId);
            modelBuilder.Entity<PublishData>()
                .HasOne(x => x.Company)
                .WithMany(x => x.PublishDatas)
                .HasForeignKey(x => x.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);
        }


        private void ConfigureRoleEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasKey(x => x.Id);
            modelBuilder.Entity<Role>().Property(x => x.CompanyId).IsRequired();

            modelBuilder.Entity<Role>()
                .HasQueryFilter(x =>
                    this.userInfoProvider.CompanyId == AdminGuid
                    || this.userInfoProvider.CompanyId == x.CompanyId);

            modelBuilder.Entity<Role>().Property(x => x.Name).IsRequired().HasMaxLength(32);
            modelBuilder.Entity<Role>().Property(x => x.Type)
                .IsRequired()
                .HasConversion(new EnumToStringConverter<RoleType>());

            var adminRole = new Role()
            {
                Id = AdminGuid,
                CompanyId = AdminGuid,
                Name = "SuperAdmin",
                Type = RoleType.SuperAdmin
            };
            modelBuilder.Entity<Role>().HasData(adminRole);

            modelBuilder.Entity<Role>()
                .HasOne(x => x.Company)
                .WithMany(x => x.Roles)
                .HasForeignKey(x => x.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);

        }

        private void ConfigureUserEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<User>()
                .HasIndex(x => x.Email)
                .IsUnique();

            modelBuilder.Entity<User>().Property(x => x.CompanyId).IsRequired();

            modelBuilder.Entity<User>()
                .HasQueryFilter(x =>
                    this.userInfoProvider.CompanyId == AdminGuid
                    || this.userInfoProvider.CompanyId == x.CompanyId);

            modelBuilder.Entity<User>().Property(x => x.PasswordHash).IsRequired();
            modelBuilder.Entity<User>().Property(x => x.PasswordSalt).IsRequired();
            modelBuilder.Entity<User>()
                .Property(x => x.Email)
                    .IsRequired()
                    .HasMaxLength(32);
                    
            modelBuilder.Entity<User>().Property(x => x.FirstName).IsRequired().HasMaxLength(32);
            modelBuilder.Entity<User>().Property(x => x.LastName).HasMaxLength(32);


            modelBuilder.Entity<User>()
                .HasOne(x => x.Company)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);

            using var hmac = new HMACSHA512();
            var admin = new User()
            {
                Id = AdminGuid,
                Email = "admin@admin.com",
                FirstName = "Admin",
                CompanyId = AdminGuid,
                PasswordSalt = hmac.Key,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Master1234"))
            };
            modelBuilder.Entity<User>().HasData(admin);

            modelBuilder.Entity<User>()
                .HasMany(x => x.Roles)
                .WithMany(x => x.Users)
                .UsingEntity(j => j.HasData(new { UsersId = AdminGuid, RolesId = AdminGuid }));
        }

        private void ConfigureCompanyEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>().HasKey(x => x.Id);

            modelBuilder.Entity<Company>().Property(x => x.Name).IsRequired().HasMaxLength(64);
            modelBuilder.Entity<Company>()
                .HasQueryFilter(x => 
                    this.userInfoProvider.CompanyId == AdminGuid
                    || this.userInfoProvider.CompanyId == x.Id);

            var adminCompany = new Company()
            {
                Id = AdminGuid,
                Name = "SuperAdminCompany"
            };
            modelBuilder.Entity<Company>().HasData(adminCompany);
        }

        private void ConfigureWfTaskEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WfTask>().HasKey(x => x.Id);
            modelBuilder.Entity<WfTask>().Property(x => x.CompanyId).IsRequired();

            modelBuilder.Entity<WfTask>().HasQueryFilter(x => x.CompanyId == this.userInfoProvider.CompanyId);


            modelBuilder.Entity<WfTask>().Property(x => x.AuthorId).IsRequired();
            modelBuilder.Entity<WfTask>().Property(x => x.ArticleId).IsRequired();
            modelBuilder.Entity<WfTask>().Property(x => x.CreationDate).IsRequired();
            modelBuilder.Entity<WfTask>().Property(x => x.Comment).HasMaxLength(512);
            modelBuilder.Entity<WfTask>().Property(x => x.Description).HasMaxLength(512);
            modelBuilder.Entity<WfTask>().Property(x => x.Type)
                .IsRequired()
                .HasConversion(new EnumToStringConverter<TaskType>());

            modelBuilder.Entity<WfTask>()
                .HasOne(x => x.Company)
                .WithMany(x => x.Tasks)
                .HasForeignKey(x => x.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WfTask>()
                .HasOne(x => x.Author)
                .WithMany(x => x.CreatedTasks)
                .HasForeignKey(x => x.AuthorId);

            modelBuilder.Entity<WfTask>()
                .HasOne(x => x.Article)
                .WithMany(x => x.Tasks)
                .HasForeignKey(x => x.ArticleId);

            modelBuilder.Entity<WfTask>()
                .HasOne(x => x.Performer)
                .WithMany(x => x.PerfomingTasks)
                .HasForeignKey(x => x.PerformerId);
        }

        #endregion
    }
}

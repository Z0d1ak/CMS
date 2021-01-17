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

        private readonly ICompanyIdProvider companyIdProvider;

        #endregion

        #region Constructor

        public DataContext(
           DbContextOptions<DataContext> options,
           ICompanyIdProvider companyIdProvider)
           : base(options)
        {
            //this.Database.EnsureCreated();
            this.companyIdProvider = companyIdProvider;
        }

        #endregion

        #region Public Properties

        public DbSet<User> Users { get; set; }

        public DbSet<Company> Companies { get; set; }

        public DbSet<WfTask> Tasks { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Article> Articles { get; set; }

        #endregion

        #region Base Overrides

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ConfigureArticleEntity(modelBuilder);
            ConfigureRoleEntity(modelBuilder);
            ConfigureUserEntity(modelBuilder);
            ConfigureCompanyEntity(modelBuilder);
            ConfigureWfTaskEntity(modelBuilder);
        }

        #endregion

        #region Private Methods

        private void ConfigureArticleEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Article>().HasKey(x => x.Id);
            modelBuilder.Entity<Article>().Property(x => x.CompanyId).IsRequired();
            
            modelBuilder.Entity<Article>().HasQueryFilter(x => x.CompanyId == this.companyIdProvider.CompanyId);

            modelBuilder.Entity<Article>().HasOne(x => x.Initiator)
                .WithMany(x => x.InitiatedArticles)
                .HasForeignKey(x => x.InitiatorId);

            modelBuilder.Entity<Article>().Property(x => x.CreationDate).IsRequired();
            modelBuilder.Entity<Article>().Property(x => x.InitiatorId).IsRequired();
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
                .HasForeignKey(x => x.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        private void ConfigureRoleEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasKey(x => x.Id);
            modelBuilder.Entity<Role>().Property(x => x.CompanyId).IsRequired();

            modelBuilder.Entity<Role>().HasQueryFilter(x => x.CompanyId == this.companyIdProvider.CompanyId);

            modelBuilder.Entity<Role>().Property(x => x.Name).IsRequired().HasMaxLength(32);
            modelBuilder.Entity<Role>().Property(x => x.Type)
                .IsRequired()
                .HasConversion(new EnumToStringConverter<RoleType>());


            modelBuilder.Entity<Role>().ToTable("roles");

            modelBuilder.Entity<Role>()
                .HasOne(x => x.Company)
                .WithMany(x => x.Roles)
                .HasForeignKey(x => x.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);

        }

        private void ConfigureUserEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(x => x.Id);
            modelBuilder.Entity<User>().Property(x => x.CompanyId).IsRequired();

            modelBuilder.Entity<User>().HasQueryFilter(x => x.CompanyId == this.companyIdProvider.CompanyId);

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
                .HasForeignKey(x => x.CompanyId)
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
            modelBuilder.Entity<WfTask>().Property(x => x.CompanyId).IsRequired();

            modelBuilder.Entity<WfTask>().HasQueryFilter(x => x.CompanyId == this.companyIdProvider.CompanyId);


            modelBuilder.Entity<WfTask>().Property(x => x.AuthorId).IsRequired();
            modelBuilder.Entity<WfTask>().Property(x => x.ArticleId).IsRequired();
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

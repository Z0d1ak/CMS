using Microsoft.Extensions.DependencyInjection;
using web.Db;
using web.Repositories;
using web.Services;

namespace web.Other
{
    public static class ServicesRegistrationExtension
    {
        public static void AddServices(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IAuthService, AuthService>();
            serviceCollection.AddScoped<IUserService, UserService>();
            serviceCollection.AddScoped<ICompanyService, CompanyService>();
            serviceCollection.AddScoped<IRoleService, RoleService>();
            serviceCollection.AddScoped<IPasswordService, PasswordService>();
            serviceCollection.AddScoped<IArticleRepository, ArticleRepository>();
            serviceCollection.AddScoped<IWfService, WfService>();
        }

        public static void AddInfrastructure(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IUserInfoProvider, UserInfoProvider>();
            serviceCollection.AddScoped<ISqlExceptionConverter, NpgSqlExceptionConverter>();
        }

        public static void AddRepositories(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IUserRepository, UserRepository>();
            serviceCollection.AddScoped<ICompanyRepository, CompanyRepository>();
            serviceCollection.AddScoped<IRoleRepository, RoleRepository>();
            serviceCollection.AddScoped<IAuthRepository, AuthRepository>();
            serviceCollection.AddScoped<IArticleService, ArticleService>();
        }
    }
}

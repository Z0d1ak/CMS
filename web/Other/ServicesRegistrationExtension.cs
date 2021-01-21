using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using web.Repositories;
using web.Services;

namespace web.Other
{
    public static class ServicesRegistrationExtension
    {
        public static void AddServices(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IAuthService, AuthService>();
        }

        public static void AddRepositories(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IUserRepository, UserRepository>();
        }
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using web.Db;
using web.Options;
using web.Other;
using web.Services;

namespace web
{
    /// <summary>
    /// МБ тут повезет
    /// </summary>
    public class Startup
    {
        #region Private Fields

        private readonly IConfiguration configuration;

        private static readonly bool Server_IsDevelopment = Environment.GetEnvironmentVariable("IsDevelopment") == "true";
        private static readonly bool Server_Test = Environment.GetEnvironmentVariable("Test") == "true";

        #endregion

        #region Constructor

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        #endregion

        #region Public Methods

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var swaggerConfig = new SwaggerConfig();
            this.configuration.GetSection(SwaggerConfig.Swagger).Bind(swaggerConfig);
            services.AddControllers().AddJsonOptions(options =>
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
            services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc("v1", new OpenApiInfo { Title = swaggerConfig.Title, Version = swaggerConfig.Version, Description = swaggerConfig.Description});

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                x.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);

                x.OperationFilter<AppendAuthorizeToSummaryOperationFilter>();
                x.SchemaFilter<SearchResponseSchemeFilter>();
                x.AddSecurityDefinition(name: "Bearer", new OpenApiSecurityScheme()
                {
                    Description = swaggerConfig.AuthDescription,
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey
                });
           
                x.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme{
                            Reference = new OpenApiReference
                            {
                                Id = "Bearer",
                                Type = ReferenceType.SecurityScheme
                            }
                    },
                    new List<string>()}
                });
            });
            services.AddHostedService<TimedHostedService>();
            services.AddServices();
            services.AddInfrastructure();
            services.AddRepositories();
            services.AddHttpContextAccessor();

            services.AddAuthentication(x =>
            {
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
               .AddJwtBearer(options =>
               {
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(
                           this.configuration.GetSection("AppSettings:Token").Value)
                       ),
                       ValidateIssuer = false,
                       ValidateAudience = false,
                       RequireExpirationTime = false,
                       ValidateLifetime = true,
                       RoleClaimType = ClaimTypes.Role
                   };
               }
               );

            var herocuDatabaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

            if (herocuDatabaseUrl is not null)
            {
                services.AddDbContext<DataContext>(options =>
                        options.UseNpgsql(GetHerokuConnectionString(herocuDatabaseUrl)));
            }
            else if(Server_Test)
            {
                services.AddDbContext<DataContext>(options =>
                        options.UseNpgsql(this.configuration.GetConnectionString("Test")));
            }
            else
            {
                services.AddDbContext<DataContext>(options =>
                        options.UseNpgsql(this.configuration.GetConnectionString("Default")));
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (Server_Test || Server_IsDevelopment || env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "web v1"));
            }

            app.UseHttpsRedirection();
            app.UseHttpMethodOverride();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapDefaultControllerRoute();
            });
        }

        #endregion

        #region Private Methods

        private static string GetHerokuConnectionString(string connectionUrl)
        {
            var databaseUri = new Uri(connectionUrl);

            string db = databaseUri.LocalPath.TrimStart('/');
            string[] userInfo = databaseUri.UserInfo.Split(':', StringSplitOptions.RemoveEmptyEntries);

            return $"User ID={userInfo[0]};Password={userInfo[1]};Host={databaseUri.Host};Port={databaseUri.Port};Database={db};Pooling=true;SSL Mode=Require;Trust Server Certificate=True;";
        }

        #endregion
    }
}

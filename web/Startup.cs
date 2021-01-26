using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using web.Db;
using web.Other;
using web.Services;

namespace web
{
    public class Startup
    {
        #region Private Fields

        private readonly IConfiguration configuration;

        private static readonly bool Server_UseInMemoryDatabase = Environment.GetEnvironmentVariable("db_type") == "inmemory";
        private static readonly bool Server_IsDevelopment = Environment.GetEnvironmentVariable("IsDevelopment") == "true";
        private static readonly bool Server_Test = Environment.GetEnvironmentVariable("Test") == "true";
        private static string SWAGGER_DESCRIPTION =
@"��� �������� � ��������� API �������, �� ������� ����� ��� ���������� �������� API � ��������� ������, ��� � �������������� API (��� Try it out ������ �� �������� ������). 
������� ����� ������� - https://hse-cms.herokuapp.com.
��������, ��� ����������� ������������ endpoint https://hse-cms.herokuapp.com/api/auth/login";

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

            services.AddControllers();
            services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc("v1", new OpenApiInfo { Title = "�������� API", Version = "v1", Description = SWAGGER_DESCRIPTION });

                x.AddSecurityDefinition(name: "Bearer", new OpenApiSecurityScheme()
                {
                    Description = "�� ��������� ������ \"Bearer \" ����� �������.",
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

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                x.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);
                
            });
            services.AddScoped<IUserInfoProvider, UserInfoProvider>();
            services.AddServices();
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

            if (Server_UseInMemoryDatabase)
            {
                services.AddDbContext<DataContext>(options => options.UseInMemoryDatabase(databaseName: "Test"));
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
            if (Server_IsDevelopment || env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "web v1"));
            }

            app.UseHttpsRedirection();
            app.UseHttpMethodOverride();
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
    }
}

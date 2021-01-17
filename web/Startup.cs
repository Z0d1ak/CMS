using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using web.Db;
using web.Services;

namespace web
{
    public class Startup
    {
        #region Private Fields

        private readonly IConfiguration configuration;

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
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "web", Version = "v1" });
            });
            services.AddScoped<ICompanyIdProvider, CompanyIdProvider>();

            services.AddDbContext<DataContext>(options =>
                    options.UseNpgsql(this.configuration.GetConnectionString("MyWebApiConection"))
                    .ReplaceService<ISqlGenerationHelper, SqlGenerationHelper>());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "web v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        #endregion
    }
}

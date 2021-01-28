﻿using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using Tests.Helpers;
using web;
using web.Db;
using web.Dto;
using web.Other.SearchParameters;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Tests.ApiTests
{
    public abstract class ApiTestBase
    {
        protected TestServer Server { get; }
        protected HttpClient Client { get; }
        protected DataContext DataContext { get; }

        public ApiTestBase()
        {
            Environment.SetEnvironmentVariable("Test", "true");

            var projectDir = GetProjectPath("", typeof(Startup).GetTypeInfo().Assembly);
            this.Server = new TestServer(new WebHostBuilder()
                .UseEnvironment("Development")
                .UseContentRoot(projectDir)
                .UseConfiguration(new ConfigurationBuilder()
                    .SetBasePath(projectDir)
                    .AddJsonFile("appsettings.json")
                    .Build()
                )
                .UseStartup<Startup>());
            this.Client = this.Server.CreateClient();
            this.DataContext = (this.Server.Services.GetService(typeof(DataContext)) as DataContext)
                ?? throw new NullReferenceException(nameof(DataContext));
        }

        [OneTimeSetUp]
        public virtual async Task OneTimeSetUpAsync()
        {
            await this.DataContext.Database.EnsureDeletedAsync();
        }

        [OneTimeTearDown]
        public virtual async Task OneTimeTearDownAsync()
        {
            await this.DataContext.Database.EnsureDeletedAsync();
        }

        protected async Task<ResponseWrapper<TResponseDto>> PostAsync<TRequestDto, TResponseDto>(
            string url,
            TRequestDto requestDto,
            CancellationToken cancellationToken = default)
        {
            this.ProvideAthorization();

            var response = await this.Client.PostAsJsonAsync(url, requestDto, cancellationToken);
            return await ConvertAsync<TResponseDto>(response, cancellationToken);
        }

        protected async Task<ResponseWrapper<TResponseDto>> GetAsync<TResponseDto>(
            string url,
            Guid id,
            CancellationToken cancellationToken = default)
        {
            this.ProvideAthorization();

            var response = await this.Client.GetAsync($"{url.TrimEnd('/')}/{id}", cancellationToken);
            return await ConvertAsync<TResponseDto>(response, cancellationToken);
        }
        
        protected async Task<ResponseWrapper<SearchResponseDto<TResponseDto>>> FindAsync<TResponseDto>(
            string url,
            ISearchParameter? searchParameter = null,
            CancellationToken cancellationToken = default)
        {
            this.ProvideAthorization();

            var response = await this.Client.GetAsync(url + searchParameter?.ToUrlParameter(), cancellationToken);
            return await ConvertAsync<SearchResponseDto<TResponseDto>>(response, cancellationToken);
        }

        protected async Task<int> UpdateAsync<TRequestDto>(
            string url,
            TRequestDto requestDto,
            CancellationToken cancellationToken = default)
        {
            this.ProvideAthorization();

            var response = await this.Client.PutAsJsonAsync(url, requestDto, cancellationToken); ;
            return (int)response.StatusCode;
        }

        protected async Task<int> DeleteAsync(
            string url,
            Guid id,
            CancellationToken cancellationToken = default)
        {
            this.ProvideAthorization();

            var response = await this.Client.DeleteAsync($"{url.TrimEnd('/')}/{id}", cancellationToken);
            return (int)response.StatusCode;
        }

        protected async Task<AuthenticationScope> AuthAsync(LoginRequestDto loginRequestDto, CancellationToken cancellationToken = default)
        {
            var response = await this.PostAsync<LoginRequestDto, LoginResponseDto>(
                "api/auth/login",
                loginRequestDto,
                cancellationToken);
            Assert.AreEqual(response.StatusCode, StatusCodes.Status200OK);
            return new AuthenticationScope(response.Content.SecurityToken);
        }

        private void ProvideAthorization()
        {
            var authenticationScope = AuthenticationScope.Current;
            if (authenticationScope is not null)
            {
                this.Client.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", authenticationScope.Token);
            }
            else
            {
                this.Client.DefaultRequestHeaders.Authorization = null;
            }
        }

        private static async Task<ResponseWrapper<TResponseDto>> ConvertAsync<TResponseDto>(
            HttpResponseMessage responseMessage,
            CancellationToken cancellationToken = default)
        {

            if (responseMessage.IsSuccessStatusCode)
            {
                //var content = await responseMessage.Content.ReadFromJsonAsync<TResponseDto>(cancellationToken: cancellationToken);
                var options = new JsonSerializerOptions();
                options.Converters.Add(new JsonStringEnumConverter());
                var content = JsonSerializer.Deserialize<TResponseDto>(await responseMessage.Content.ReadAsByteArrayAsync(cancellationToken), options);

                return new ResponseWrapper<TResponseDto>(responseMessage.StatusCode, content!);
            }
            else
            {
                return new ResponseWrapper<TResponseDto>(responseMessage.StatusCode);
            }
        }

        private static string GetProjectPath(string projectRelativePath, Assembly startupAssembly)
        {
            // Get name of the target project which we want to test
            var projectName = startupAssembly.GetName().Name!;

            // Get currently executing test project path
            var applicationBasePath = AppContext.BaseDirectory;

            // Find the path to the target project
            var directoryInfo = new DirectoryInfo(applicationBasePath);
            do
            {
                directoryInfo = directoryInfo.Parent!;

                var projectDirectoryInfo = new DirectoryInfo(Path.Combine(directoryInfo.FullName, projectRelativePath));
                if (projectDirectoryInfo.Exists)
                {
                    var projectFileInfo = new FileInfo(Path.Combine(projectDirectoryInfo.FullName, projectName, $"{projectName}.csproj"));
                    if (projectFileInfo.Exists)
                    {
                        return Path.Combine(projectDirectoryInfo.FullName, projectName);
                    }
                }
            }
            while (directoryInfo.Parent != null);

            throw new Exception($"Project root could not be located using the application root {applicationBasePath}.");
        }
    }
}

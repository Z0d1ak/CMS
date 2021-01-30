using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using web.Dto;
using web.Dto.Request;
using web.Dto.Response;
using web.Other;
using web.Repositories;

namespace web.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration configuration;
        private readonly IAuthRepository authRepository;

        public AuthService(
            IConfiguration configuration,
            IAuthRepository authRepository)
        {
            this.configuration = configuration;
            this.authRepository = authRepository;
        }

        public async Task<ServiceResult<LoginResponseDto>> LoginAsync(LoginRequestDto loginRequestDto, CancellationToken cancellationToken = default)
        {
            var serviceResult = await this.authRepository.LoginAsync(loginRequestDto, cancellationToken);

            if(!serviceResult.IsSuccessful())
            {
                return new ServiceResult<LoginResponseDto>(StatusCodes.Status401Unauthorized);
            }

            var user = serviceResult.Value;

            var claims = new List<Claim>()
            {
                new Claim("UserId", user.Id.ToString()),
                new Claim("CompanyId", user.CompanyId.ToString())
            };
            foreach (var role in user.Roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.ToString()));
            }

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(
                this.configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(30),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new ServiceResult<LoginResponseDto>(new LoginResponseDto()
            {
                SecurityToken = tokenHandler.WriteToken(token),
                User = user
            });
        }
    }
}

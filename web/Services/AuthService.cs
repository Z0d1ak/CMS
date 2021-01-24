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
using web.Other;
using web.Repositories;

namespace web.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration configuration;
        private readonly IUserRepository userRepository;

        public AuthService(
            IConfiguration configuration,
            IUserRepository userRepository)
        {
            this.configuration = configuration;
            this.userRepository = userRepository;
        }

        public async Task<ServiceResult<LoginResponseDto>> LoginAsync(LoginRequestDto authDto, CancellationToken cancellationToken = default)
        {
            var user = await this.userRepository.LoginAsync(authDto.Email, cancellationToken);

            if(user is null)
            {
                return new ServiceResult<LoginResponseDto>(StatusCodes.Status401Unauthorized);
            }
            if(!VerifyPasswordHash(authDto.Password, user.PasswordHash, user.PasswordSalt))
            {
                return new ServiceResult<LoginResponseDto>(StatusCodes.Status401Unauthorized);
            }

            var claims = new List<Claim>()
            {
                new Claim("UserId", user.Id.ToString()),
                new Claim("CompanyId", user.CompanyId.ToString())
            };
            foreach (var role in user.Roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Type.ToString()));
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
                User = user.ToDto()
            });
        }

        private static bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512(passwordSalt);
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            if (!hash.SequenceEqual(passwordHash))
            {
                return false;
            }
            return true;
        }
    }
}

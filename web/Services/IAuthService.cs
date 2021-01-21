using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using web.Dto;

namespace web.Services
{
    public interface IAuthService
    {
        public Task<LoginResponseDto> LoginAsync(LoginRequestDto authDto, CancellationToken cancellationToken = default);
    }
}

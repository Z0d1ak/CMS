using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using web.Dto;
using web.Other;

namespace web.Services
{
    public interface IAuthService
    {
        public Task<ServiceResult<LoginResponseDto>> LoginAsync(LoginRequestDto authDto, CancellationToken cancellationToken = default);
    }
}

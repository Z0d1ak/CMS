using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Other;

namespace web.Services
{
    public interface IAuthService
    {
        public Task<ServiceResult<LoginResponseDto>> LoginAsync(LoginRequestDto authDto, CancellationToken cancellationToken = default);
    }
}

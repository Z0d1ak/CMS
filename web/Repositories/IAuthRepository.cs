using System.Threading;
using System.Threading.Tasks;
using web.Contracts.Dto.Request;
using web.Contracts.Dto.Response;
using web.Other;

namespace web.Repositories
{
    public interface IAuthRepository
    {
        Task<ServiceResult<ResponseUserDto>> LoginAsync(LoginRequestDto loginRequestDto, CancellationToken cancellationToken = default);
    }
}

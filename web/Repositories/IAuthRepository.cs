using System.Threading;
using System.Threading.Tasks;
using web.Dto;
using web.Other;
using web.Dto.Request;
using web.Dto.Response;

namespace web.Repositories
{
    public interface IAuthRepository
    {
        Task<ServiceResult<ResponseUserDto>> LoginAsync(LoginRequestDto loginRequestDto, CancellationToken cancellationToken = default);
    }
}

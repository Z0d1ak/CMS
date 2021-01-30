using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace web.Services
{
    public interface IPasswordService
    {
        ValueTask<bool> VerifyPasswordAsync(
            string password,
            byte[] passwordHash,
            byte[] passwordSalt,
            CancellationToken cancellationToken = default);

        ValueTask<(byte[], byte[])> CreatePasswordHashAsync(
            string password,
            CancellationToken cancellationToken = default);
    }
}

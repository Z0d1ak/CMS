using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace web.Services
{
    public class PasswordService
        : IPasswordService
    {
        public ValueTask<(byte[], byte[])> CreatePasswordHashAsync(
            string password,
            CancellationToken cancellationToken = default)
        {
            using var hmac = new HMACSHA512();
            return new ValueTask<(byte[], byte[])>(
                (
                    hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                    hmac.Key                
                ));
        }

        public ValueTask<bool> VerifyPasswordAsync(
            string password,
            byte[] passwordHash,
            byte[] passwordSalt,
            CancellationToken cancellationToken = default)
        {
            using var hmac = new HMACSHA512(passwordSalt);
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            if (!hash.SequenceEqual(passwordHash))
            {
                return new ValueTask<bool>(false);
            }
            return new ValueTask<bool>(true);
        }
    }
}

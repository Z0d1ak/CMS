using System.Threading;
using System.Threading.Tasks;

namespace web.Services
{
    public interface IPasswordService
    {
        /// <summary>
        /// Проверят корректность пароля.
        /// </summary>
        /// <param name="password">Пароль.</param>
        /// <param name="passwordHash">Хэш пароля.</param>
        /// <param name="passwordSalt">Соль.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <returns>Признак корректности пароля.</returns>
        ValueTask<bool> VerifyPasswordAsync(
            string password,
            byte[] passwordHash,
            byte[] passwordSalt,
            CancellationToken cancellationToken = default);

        /// <summary>
        /// Создает хэш и соль для пароля.
        /// </summary>
        /// <param name="password">Пароль.</param>
        /// <param name="cancellationToken">Токен для отмены операции.</param>
        /// <returns>(хэш пароля, соль)</returns>
        ValueTask<(byte[], byte[])> CreatePasswordHashAsync(
            string password,
            CancellationToken cancellationToken = default);
    }
}

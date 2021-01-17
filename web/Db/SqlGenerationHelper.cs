using System.Text;
using Microsoft.EntityFrameworkCore.Storage;
using Npgsql.EntityFrameworkCore.PostgreSQL.Storage.Internal;

namespace web.Db
{
    /// <summary>
    /// Конвертер имен из объектной модели в имена из бд.
    /// Имена из CamelCase конвертируются в snake_case. 
    /// Имена приводятся к нижнему регистру.
    /// </summary>
    public sealed class SqlGenerationHelper : NpgsqlSqlGenerationHelper
    {
        public SqlGenerationHelper(RelationalSqlGenerationHelperDependencies dependencies) 
            : base(dependencies)
        { }

        public override string DelimitIdentifier(string identifier)
        {
            var sb = new StringBuilder(16);
            this.DelimitIdentifier(sb, identifier);

            return sb.ToString();
        }

        public override void DelimitIdentifier(StringBuilder sb, string identifier)
        {
            for (var i = 0; i < identifier.Length; i++)
            {
                var ch = identifier[i];
                if (i == 0)
                {
                    sb.Append(char.ToLower(ch));
                }
                else if (char.IsUpper(ch))
                {
                    if (char.IsLower(identifier[i - 1]))
                    {
                        sb.Append('_');
                    }
                    sb.Append(char.ToLower(ch));
                }
                else
                {
                    sb.Append(ch);
                }
            }
        }
    }
}

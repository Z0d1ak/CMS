using Microsoft.EntityFrameworkCore;

namespace web.Db
{
    public interface ISqlExceptionConverter
    {
        public int? Convert(DbUpdateException dbUpdateException);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace web.Db
{
    public class NpgSqlExceptionConverter
        : ISqlExceptionConverter
    {
        public int? Convert(DbUpdateException dbUpdateException)
        {
            if(dbUpdateException is DbUpdateConcurrencyException dbUpdateConcurrencyException)
            {
                return StatusCodes.Status404NotFound;
            }
            else if(dbUpdateException.InnerException is null)
            {
                return null;
            }
            else if(dbUpdateException.InnerException is PostgresException pgException)
            {
                switch (pgException.SqlState)
                {
                    case PostgresErrorCodes.UniqueViolation:
                        return StatusCodes.Status409Conflict;
                }
            }
            return null;
        }
    }
}

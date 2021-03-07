using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Contracts.Dto.Request
{
    /// <summary>
    /// Контаркт данных для завершения задания.
    /// </summary>
    public class FinishTaskDto
    {
        /// <summary>
        /// Идентификатор задания.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Комментарии.
        /// </summary>
        public Guid Comment { get; set; }
    }
}

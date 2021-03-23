using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using web.Entities;

namespace web.Contracts.Dto.Response
{
    public class ResponseArticleInfoDto
    {
        /// <summary>
        /// ID статьи.
        /// </summary>
        [Required]
        [Key]
        public Guid Id { get; set; }

        /// <summary>
        /// Инициатор статьи.
        /// </summary>
        public ResponseUserDto Initiator { get; set; } = null!;

        /// <summary>
        /// Дата взятия статьи в работу.
        /// </summary>
        public DateTime CreationDate { get; set; }

        /// <summary>
        /// Состояние статьи.
        /// </summary>
        public ArticleState State { get; set; }

        /// <summary>
        /// Заголовок статьи.
        /// </summary>
        [Required]
        [MaxLength(256)]
        public string Title { get; set; } = null!;

        /// <summary>
        ///   Активное задание.
        /// </summary>
        public ResponseTaskDto? Task { get; set; }
    }
}

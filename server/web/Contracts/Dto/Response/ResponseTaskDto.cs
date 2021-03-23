using System;
using System.ComponentModel.DataAnnotations;
using web.Entities;

namespace web.Contracts.Dto.Response
{
    public class ResponseTaskDto
    {
        /// <summary>
        /// ID задания.
        /// </summary>
        [Required]
        [Key]
        public Guid Id { get; set; }

        /// <summary>
        /// Тип задания.
        /// </summary>
        [Required]
        public TaskType Type { get; set; }

        /// <summary>
        /// Исполнитель задания.
        /// </summary>
        public ResponseUserDto? Performer { get; set; }

        /// <summary>
        /// Автор задания.
        /// </summary>
        public ResponseUserDto Author { get; set; } = null!;

        /// <summary>
        /// Дата создания задания.
        /// </summary>
        public DateTime CreationDate { get; set; }

        /// <summary>
        /// Дата взятия задания в работу.
        /// </summary>
        public DateTime? AssignmentDate { get; set; }

        /// <summary>
        /// Дата заврешения задания.
        /// </summary>
        public DateTime? СompletionDate { get; set; }

        /// <summary>
        /// Комментарии к заданию.
        /// </summary>
        [Required]
        [MaxLength(512)]
        public string Description { get; set; } = null!;

        /// <summary>
        /// Комментарии к заданию.
        /// </summary>
        [Required]
        [MaxLength(512)]
        public string? Comment { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using web.Entities;

namespace web.Contracts.Dto.Request
{
    /// <summary>
    /// Контракт для сохранения нового задания. 
    /// </summary>
    public class CreateTaskDto
    {
        /// <summary>
        /// ID задания.
        /// </summary>
        [Required]
        [Key]
        public Guid Id { get; set;}

        /// <summary>
        /// Тип задания.
        /// </summary>
        [Required]
        public TaskType TaskType { get; set; }

        /// <summary>
        /// Описание задания.
        /// </summary>
        [Required]
        [MaxLength(512)]
        public string Description { get; set; } = null!;

        /// <summary>
        /// Сотрудник, на которого назначено задания.
        /// Необязательное поле.
        /// </summary>
        public Guid? Assignee { get; set; } = null;
    }
}

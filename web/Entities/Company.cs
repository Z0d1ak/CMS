using System;
using System.Collections.Generic;

#nullable disable

namespace web.Entities
{
    /// <summary>
    /// Объект, описывающий сущность компании.
    /// </summary>
    public sealed class Company
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public ICollection<User> Users { get; set; } = new List<User>();

        public ICollection<Article> Articles { get; set; } = new List<Article>();

        public ICollection<WfTask> Tasks { get; set; } = new List<WfTask>();


        public ICollection<Role> Roles { get; set; } = new List<Role>();

        public ICollection<TelegrammData> TelegrammDatas { get; set; } = new List<TelegrammData>();


        public ICollection<PublishData> PublishDatas { get; set; } = new List<PublishData>();

    }
}

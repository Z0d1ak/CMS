using System;

namespace web.Entities
{
    /// <summary>
    /// Роль рользователя в системе.
    /// </summary>
    public sealed class Role
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
    }
}

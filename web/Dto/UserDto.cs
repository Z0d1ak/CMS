using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using web.Entities;

namespace web.Dto
{
    public class UserDto
    {
        public UserDto() { }

        public UserDto(User user)
        {
            this.Id = user.Id;
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.Email = user.Email;
            this.Roles = user.Roles.Select(x => x.Type.ToString());
        }

        public Guid Id { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public IEnumerable<string> Roles { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using web.Dto;

namespace Tests.Helpers
{
    public static class DefaultDtos
    {
        public static LoginRequestDto SuperAdminLoginDto = new LoginRequestDto
        {
            Email = "admin@admin.com",
            Password = "Master1234"
        };
    }
}

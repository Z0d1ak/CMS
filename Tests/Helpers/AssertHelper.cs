using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using web.Dto;

namespace Tests.Helpers
{
    public static class AssertHelper
    {
        public static void AsserUserEquals(UserDto expectedUserDto, UserDto actualUserDto)
        {
            Assert.AreEqual(expectedUserDto.Id, actualUserDto.Id);
            Assert.AreEqual(expectedUserDto.FirstName, actualUserDto.FirstName);
            Assert.AreEqual(expectedUserDto.LastName, actualUserDto.LastName);
            Assert.AreEqual(expectedUserDto.Email, actualUserDto.Email);
            Assert.AreEqual(expectedUserDto.Id, actualUserDto.Id);
            Assert.True(expectedUserDto.Roles.ToEmptyIfNull().SequenceEqual(actualUserDto.Roles.ToEmptyIfNull()));
        }

        public static IEnumerable<T> ToEmptyIfNull<T>(this IEnumerable<T>? c)
        {
            if(c is null)
            {
                return new List<T>();
            }

            return c;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using web.Dto.Request;
using web.Dto.Response;

namespace Tests.Helpers
{
    public static class AssertHelper
    {
        public static void AreEquals(StoreUserDto expectedDto, ResponseUserDto actualDto)
        {
            Assert.AreEqual(expectedDto.Id, actualDto.Id);
            Assert.AreEqual(expectedDto.FirstName, actualDto.FirstName);
            Assert.AreEqual(expectedDto.LastName, actualDto.LastName);
            Assert.AreEqual(expectedDto.Email, actualDto.Email);
            Assert.AreEqual(expectedDto.Id, actualDto.Id);
            Assert.True(expectedDto.Roles.ToEmptyIfNull().SequenceEqual(actualDto.Roles.ToEmptyIfNull()));
        }

        public static void AreEquals(StoreCompanyDto expectedDto, ResponseCompanyDto actualDto)
        {
            Assert.AreEqual(expectedDto.Id, actualDto.Id);
            Assert.AreEqual(expectedDto.Name, actualDto.Name);
        }

        public static void AreEquals(StoreRoleDto expectedDto, ResponseRoleDto actualDto)
        {
            Assert.AreEqual(expectedDto.Id, actualDto.Id);
            Assert.AreEqual(expectedDto.Name, actualDto.Name);
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

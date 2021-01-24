using System;
using System.Collections.Generic;
using System.Linq;

namespace Tests.Helpers
{
    public class AuthenticationScope : IDisposable
    {
        private static List<AuthenticationScope> scopesStack = new List<AuthenticationScope>(); 
        public static AuthenticationScope? Current
        {
            get => scopesStack.FirstOrDefault();
        }

        public AuthenticationScope(string token)
        {
            this.Token = token;
            scopesStack.Insert(0, this);
        }

        public string Token { get; }

        private bool disposed = false;

        public void Dispose() => Dispose(true);

        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
            {
                return;
            }

            if (disposing)
            {
                scopesStack.Remove(this);
            }

            disposed = true;
        }
    }
}

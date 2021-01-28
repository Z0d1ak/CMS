using System;
using System.Collections.Generic;
using System.Linq;

namespace Tests.Helpers
{
    public class AuthenticationScope : IDisposable
    {
        private static readonly List<AuthenticationScope> scopesStack = new List<AuthenticationScope>();

        private bool disposed = false;

        public static AuthenticationScope? Current
        {
            get => scopesStack.FirstOrDefault();
        }

        public string Token { get; }

        public AuthenticationScope(string securityToken)
        {
            this.Token = securityToken ?? throw new ArgumentNullException(nameof(securityToken));
            scopesStack.Insert(0, this);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

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

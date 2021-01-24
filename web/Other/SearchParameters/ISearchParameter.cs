using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Threading.Tasks;

namespace web.Other.SearchParameters
{
    public interface ISearchParameter
    {
        string ToUrlParameter();
    }
}

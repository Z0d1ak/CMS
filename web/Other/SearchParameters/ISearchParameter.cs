using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace web.Other.SearchParameters
{
    public interface ISearchParameter
    {
        void ToParametersList(List<string> parameters);
    }
}

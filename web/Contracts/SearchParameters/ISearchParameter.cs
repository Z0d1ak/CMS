using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace web.Contracts.SearchParameters
{
    public interface ISearchParameter
    {
        void ToParametersList(List<string> parameters);
    }
}

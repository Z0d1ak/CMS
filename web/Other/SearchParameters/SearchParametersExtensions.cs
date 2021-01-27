using System.Collections.Generic;
using System.Linq;

namespace web.Other.SearchParameters
{
    public static class SearchParametersExtensions
    {
        public static string ToUrlParameter(this ISearchParameter searchParameter)
        {
            var parameters = new List<string>();
            searchParameter.ToParametersList(parameters);
            if(parameters.Count() == 0)
            {
                return string.Empty;
            }

            return '?' + string.Join("&", parameters);
        }
    }
}

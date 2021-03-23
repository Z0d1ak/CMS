using System.Collections.Generic;

namespace web.Contracts.SearchParameters
{
    public static class SearchParametersExtensions
    {
        public static string ToUrlParameter(this ISearchParameter searchParameter)
        {
            if (searchParameter is null)
            {
                return string.Empty;
            }

            var parameters = new List<string>();
            searchParameter.ToParametersList(parameters);
            if (parameters.Count == 0)
            {
                return string.Empty;
            }

            return '?' + string.Join("&", parameters);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace truckload.Helpers
{
    public static class StringExtension
    {
        // This is the extension method.
        // The first parameter takes the "this" modifier
        // and specifies the type for which the method is defined.

        public static bool IsNullOrEmpty(this String text)
        {
            return text == null || text.Trim().Length == 0;
        }
        public static bool IsTextNumeric(this string s)
        {
            return float.TryParse(s, out _);
        }

    }

    public static class ObjectExtensions
    {
        public static string ToJsonString(this object obj)
        {
            JsonSerializerSettings serializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            return JsonConvert.SerializeObject(obj, Formatting.None, serializerSettings);
        }
    }

    public static class ExceptionExtensions
    {
        public static Exception GetOriginalException(this Exception ex)
        {
            if (ex.InnerException == null) return ex;

            return ex.InnerException.GetOriginalException();
        }
    }
}
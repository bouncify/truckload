using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.UI;
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

    public static class MyHtmlHelperExtensions
    {
        public static Kendo.Mvc.UI.Fluent.GridBuilder<T> ViewGrid<T>(this HtmlHelper helper, string viewName, int height = 550, string templateName = "", string action = "View_Read", string controller = "AgViews", string area = "AgRecon")
            where T : class
        {

            var grid = helper.Kendo().Grid<T>()
                .Name("grid")
                .Events(e => e.DataBound("onDataBound"))
                .Resizable(r => r.Columns(true))
                .Pageable()
                .Selectable(s => s.Enabled(false))
                .Sortable()
                .Scrollable()
                .Filterable()
                .HtmlAttributes(new { style = "height:" + height + "px;cursor: pointer;" })
                .DataSource(dataSource => dataSource.Ajax()
                    .Events(events => { events.Error("Shared.gridErrorHandler"); }).PageSize(20)
                    .Read(read => read.Action(action, controller, new { Area = area, ViewName = viewName })));

            if (!templateName.IsNullOrEmpty())
            {
                grid.ClientDetailTemplateId(templateName);
            }

            return grid;

        }

    }
}
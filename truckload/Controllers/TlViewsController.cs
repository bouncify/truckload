using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using truckload.Helpers;
using truckload.Helpers.Vm;

namespace truckload.Controllers
{
    [Authorize]
    public class TlViewsController : BaseController
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitViewData(TabMenu.Views);
        }

        public ActionResult Index(string viewName)
        {
            ViewData["ViewName"] = viewName;
            return View();
        }

        public ActionResult View_Read([DataSourceRequest] DataSourceRequest request, string viewName)
        {
            DataSourceResult result = null;
            try
            {
                switch (viewName)
                {
                    case "Drivers":
                        result = GetDataSourceResults.GetDrivers(request);
                        break;
                    case "Trucks":
                        result = GetDataSourceResults.GetTrucks(request);
                        break;
                    case "Trailers":
                        result = GetDataSourceResults.GetTrailers(request);
                        break;
                    case "Warehouses":
                        result = GetDataSourceResults.GetWarehouses(request);
                        break;
                }
            }

            catch (Exception e)
            {
                result = new DataSourceResult() { Errors = viewName + " read error: " + ServerError.GetErrorFromException(e).ExceptionMsg };
            }

            var rtnObj = Json(result, JsonRequestBehavior.AllowGet);

            return rtnObj;
        }
    }
}
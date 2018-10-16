using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using truckload.DbContext;
using truckload.Helpers;
using truckload.Helpers.Repositories;

namespace truckload
{
    public class MvcApplication : System.Web.HttpApplication
    {
        private OrderRepository _ordersDependency;

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            AntiForgeryConfig.UniqueClaimTypeIdentifier = ClaimTypes.Name;

            _ordersDependency = new OrderRepository();
            _ordersDependency.StartDependency();
        }

        protected void Application_End()
        {
            _ordersDependency.StopDependency();
        }

        protected void Application_Error(Object sender, EventArgs e)
        {
            var raisedException = Server.GetLastError();
            var userName = User.Identity.Name;
            var url = HttpContext.Current.Request.Url.ToString();

            ServerError.LogException(raisedException, url, userName);
        }
    }
}

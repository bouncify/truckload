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

namespace truckload
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            AntiForgeryConfig.UniqueClaimTypeIdentifier = ClaimTypes.Name;
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

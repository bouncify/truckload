using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace truckload.Controllers
{
    [Authorize]
    public class LoadsController : BaseController
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitViewData(TabMenu.Admin);
        }




    }
}
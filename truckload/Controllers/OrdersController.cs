using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace truckload.Controllers
{
    public class OrdersController : BaseController
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitViewData(TabMenu.Views);
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}
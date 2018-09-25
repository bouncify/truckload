using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace truckload.Controllers
{
    [Authorize]
    public class OrderCentralController : BaseController
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitViewData(TabMenu.OrderCentral);
        }

        public ActionResult Index()
        {
            ViewBag.IsCustomContainer = true;
            return View();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using truckload.Helpers;
using truckload.Helpers.OrderCentral;

namespace truckload.Controllers
{
    public class OrdersController : BaseController
    {
        [Authorize]
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitViewData(TabMenu.Views);
        }

        [HttpGet]
        public ActionResult GetOrders(string orderNumberFilter = "")
        {
            var orders = OrderHelper.GetOrdersList(Db, CurrentUser, null, orderNumberFilter);

            var ordersJson = Json(orders.ToJsonString(), JsonRequestBehavior.AllowGet);

            return ordersJson;
        }
    }
}
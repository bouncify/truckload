using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting;
using System.Web;
using System.Web.Mvc;
using truckload.DbContext;
using truckload.Helpers;
using truckload.Helpers.OrderCentral;
using truckload.Helpers.Vm;

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
        public ActionResult GetOrder(long orderId)
        {
            var orders = OrderHelper.GetOrdersList(Db, CurrentUser, orderId, null);

            if (orders != null)
            {
                if (orders.Count == 1)
                {
                    var order = orders.FirstOrDefault();
                    return Json(order.ToJsonString(), JsonRequestBehavior.AllowGet);
                }
            }

            throw new ServerException($"Cannot find order {orderId}");
        }

        [HttpGet]
        public ActionResult GetOrders(string orderNumberFilter = "")
        {
            var orders = OrderHelper.GetOrdersList(Db, CurrentUser, null, orderNumberFilter);

            var ordersJson = Json(orders.ToJsonString(), JsonRequestBehavior.AllowGet);

            return ordersJson;
        }

        [HttpPost]
        public ActionResult SaveOrder(VmKoOrder order)
        {
            try
            {
                if (CurrentUser.UserLevel < (int)Enums.AccessLevel.Entry)
                {
                    throw new ServerException("Save Order: User does not have permission to save an order");
                }

                var dbOrder = Db.Orders.FirstOrDefault(o => o.OrderId == order.OrderId);

                if (dbOrder != null)
                {
                    var isOnLoad = dbOrder.LoadId != null;

                    //if (isOnLoad)
                    //{
                    //    var dbLoad = Db.Loads.Find(dbOrder.LoadId);

                    //    if (dbLoad != null)
                    //    {
                    //        dbLoad.ModifiedDate = DateTime.Now;
                    //        dbLoad.ModifiedByGlobalId = _currentUser.GlobalId;
                    //    }
                    //}

                    dbOrder.CustAddress = order.CustomerAddress;
                    dbOrder.CustomerName = order.CustomerName;
                    dbOrder.OrderNumber = order.OrderNumber;
                    dbOrder.DeliveryDate = order.DeliveryDate;
                    dbOrder.PickupDate = order.PickupDate;
                    dbOrder.Destination = order.Destination;
                    dbOrder.WarehouseId = order.WarehouseId;

                    dbOrder.IsDangerousGoods = order.IsDangerousGoods;
                    dbOrder.IsCustomerPickup = order.IsCustomerPickup;
                    dbOrder.Notes = order.Notes;
                    dbOrder.Volume = order.Volume;
                    dbOrder.UnitOfMeasureId = order.UnitOfMeasureId;
                    dbOrder.WeightKg = order.WeightKg;
                    dbOrder.ModifiedDate = DateTime.Now;
                    dbOrder.ModifiedByUserLoginId = CurrentUser.UserLoginId;

                    Db.SaveChanges();
                }
                else
                {// add it;)
                    var newOrder = new Order()
                    {
                        OrderNumber = order.OrderNumber,
                        CreatedDate = DateTime.Now,
                        CreatedByUserLoginId = CurrentUser.UserLoginId
                    };

                    Db.Orders.Add(newOrder);
                    Db.SaveChanges();
                    order.OrderId = newOrder.OrderId;
                }

            }
            catch (Exception e)
            {
                return ReturnOrder(order, ServerError.GetErrorFromException(e).ExceptionMsg);
            }

            return ReturnOrder(order, $"Order# {order.OrderNumber} has been saved");
        }

        private JsonResult ReturnOrder(VmKoOrder order, string actionMessage = "")
        {
            order.ActionResultMessage = actionMessage;

            var rtnOrder = Json(order.ToJsonString(), JsonRequestBehavior.AllowGet);

            return rtnOrder;
        }
    }
}
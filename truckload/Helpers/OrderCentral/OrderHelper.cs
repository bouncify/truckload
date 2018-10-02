using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using truckload.DbContext;
using truckload.Helpers.Vm;

namespace truckload.Helpers.OrderCentral
{
    public class OrderHelper
    {
        public static List<VmKoOrder> GetOrdersList(truckloadEntities db, VmUser currentUser, long? orderId = null, string orderNumberFilter = "", long? loadId = null)
        {
            var isSingleOrder = orderId != null;
            var isByLoadId = loadId != null;

            var query = from h in db.Orders select h;

            if (isSingleOrder)
            {
                query = query.Where(o => o.OrderId == orderId);
            }

            query = isByLoadId ? 
                query.Where(o => o.LoadId == loadId) : 
                query.Where(o => o.LoadId == null);

            if (!orderNumberFilter.IsNullOrEmpty())
            {
                query = query.Where(o => o.OrderNumber.Contains(orderNumberFilter));
            }

            var orders = query.Select(d => new VmKoOrder()
            {
                OrderId = d.OrderId,
                OrderNumber = d.OrderNumber,
                CustomerName = d.CustomerName,
                CustomerAddress = d.CustAddress,
                UserName = d.UserLogin1.UserName ?? d.UserLogin.UserName,
                LastChangeDate = d.ModifiedDate ?? d.CreatedDate,
                UnitDescription = "" + d.Volume + " " + d.UnitOfMeasure.Description + " / " + d.WeightKg + "KG",
                PickupDate = d.PickupDate,
                DeliveryDate = d.DeliveryDate,
                WarehouseDescription = d.Warehouse.Description,
                IsCustomerPickup = d.IsCustomerPickup,
                IsDangerousGoods = d.IsDangerousGoods,
                IsDraggable = currentUser.UserLevel > 1,
                LoadSort = d.LoadSort ?? 0,
                WarehouseId = d.WarehouseId,
                UnitOfMeasureId = d.UnitOfMeasureId,
                Destination = d.Destination,
                Notes = d.Notes,
                Volume = d.Volume??0,
                WeightKg = d.WeightKg
            }).ToList();

            return orders;
        }
    }
}
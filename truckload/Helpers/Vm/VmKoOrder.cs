using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace truckload.Helpers.Vm
{
    public class VmKoOrder
    {
        public long OrderId { get; set; }
        public string OrderNumber { get; set; }
        public string CustomerName { get; set; }
        public string CustAddress { get; set; }
        public DateTime? LastChangeDate { get; set; }
        public string UserName { get; set; }
        public string UnitDescription { get; set; }
        public DateTime? PickupDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string WarehouseDescription { get; set; }
        public bool IsDangerousGoods { get; set; }
        public bool IsCustomerPickup { get; set; }
        public bool IsDraggable { get; set; }
        public int LoadSort { get; set; }
    }
}
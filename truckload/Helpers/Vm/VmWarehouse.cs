using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace truckload.Helpers.Vm
{
    public class VmWarehouse
    {
        public int WarehouseId { get; set; }
        public bool IsActive { get; set; }
        public string WarehouseCode { get; set; }
        public string Description { get; set; }
    }
}
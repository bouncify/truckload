using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace truckload.Helpers.Vm
{
    public class VmKoDropDownData
    {
        public List<VmKoSelectListItem> TruckList { get; set; }
        public List<VmKoSelectListItem> TrailerList { get; set; }
        public List<VmKoSelectListItem> DriverList { get; set; }
        public List<VmKoSelectListItem> LoadStatusList { get; set; }
        public List<VmKoSelectListItem> UnitsOfMeasureList { get; set; }
        public List<VmKoSelectListItem> WarehouseList { get; set; }
        public string ActionResultMessage { get; set; }
    }
}
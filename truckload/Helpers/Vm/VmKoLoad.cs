using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace truckload.Helpers.Vm
{
    public class VmKoLoad
    {
        public long LoadId { get; set; }
        public DateTime LoadDate { get; set; }
        public int LoadCapacityKg { get; set; }
        public int CurrentLoadWeightKg { get; set; }

        public int? UnitOfMeasureId { get; set; }
        public string UnitTypeDescription { get; set; }

        public int CurrentUnitCount { get; set; }
        public int UnitCapacity { get; set; }

        public int? TruckId { get; set; }
        public string TruckDescription { get; set; }

        public int? TrailerId { get; set; }
        public string TrailerDescription { get; set; }

        public int? DriverId { get; set; }
        public string DriverName { get; set; }
        public int LoadStatusId { get; set; }
        public int PostalCodeGroupId { get; set; }
        public DateTime? LastChangeDate { get; set; }
        public string UserName { get; set; }

        public List<VmKoOrder> OrdersList { get; set; }

        public long[] NewOrderSequence { get; set; }
        public string ActionResultMessage { get; set; }
    }
}
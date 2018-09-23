using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace truckload.Helpers.Vm
{
    public class VmTrailer
    {
        public int TrailerId { get; set; }
        public string TrailerDescription { get; set; }
        public int TrailerTypeId { get; set; }
        public int Volume { get; set; }
        public int UnitOfMeasureId { get; set; }
        public int CapacityKg { get; set; }
        public string AxlesDescription { get; set; }
        public bool IsActive { get; set; }
    }
}
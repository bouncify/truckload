using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace truckload.Helpers.Vm
{
    public class VmTruck
    {
        public int TruckId { get; set; }
        public string TruckDescription { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}", ApplyFormatInEditMode = true)]
        [DisplayName("Next Maintenance Due")]
        public DateTime? NextMaintenanceDate { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}", ApplyFormatInEditMode = true)]
        [DisplayName("Next Inspection Due")]
        public DateTime? NextInspectionDate { get; set; }
        public bool IsActive { get; set; }
    }
}
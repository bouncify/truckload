using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace truckload.Helpers.Vm
{
    public class VmDragDropResult
    {
        public long OrderId { get; set; }
        public long LoadId { get; set; }
        public string Message { get; set; }
    }
}
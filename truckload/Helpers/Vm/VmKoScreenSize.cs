using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace truckload.Helpers.Vm
{
    public class VmKoScreenSize
    {
        public int OrdersPageSize { get; set; }
        public int VisibleLoadCols { get; set; }

        public string ActionResultMessage { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace truckload.Vm
{
    public class VmUser
    {
        public int TimezoneOffset { get; set; }

        public string EmailAddress { get; set; }

        public string DisplayName { get; set; }

        public bool IsAdmin { get; set; }

        public int UserLevel { get; set; }
        public string UserLevelDescription { get; set; }
    }
}
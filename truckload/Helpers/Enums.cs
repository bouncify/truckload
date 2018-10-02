using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace truckload.Helpers
{
    public class Enums
    {
        public enum AccessLevel
        {
            None = 0,
            Entry = 1,
            Dispatcher = 2
        }

        public enum LoadStatus
        {
            Unlocked = 1,
            Locked = 2,
            Dispatched = 4
        }
    }
}
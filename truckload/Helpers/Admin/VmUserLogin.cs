using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using truckload.DbContext;

namespace truckload.Helpers.Admin
{
    public class VmUserLogin
    {
        public int UserLoginId { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }
        public string Email { get; set; }
        public int AccessLevelId { get; set; }

    }
}
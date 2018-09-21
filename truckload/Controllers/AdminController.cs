using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using truckload.Helpers;
using truckload.Helpers.Admin;
using truckload.Helpers.Vm;

namespace truckload.Controllers
{
    [Authorize]
    public class AdminController : BaseController
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitViewData();
        }
        // GET: Admin
        public ActionResult EditUsers()
        {
            return View();
        }

        public ActionResult TestGrid()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetAccessLevels()
        {
            var accessLevels = Db.AccessLevels.Select(a => new DropDownItem()
            {
                Text = a.Description,
                ValueInt = a.AccessLevelId               
            }).ToList();

            var ordersJson = Json(accessLevels.ToJsonString(), JsonRequestBehavior.AllowGet);

            return ordersJson;
        }

        [HttpGet]
        public ActionResult GetUserLogins()
        {
            var accessLevels = Db.UserLogins.Select(a => new VmUserLogin()
            {
                AccessLevelId = a.AccessLevelId,
                Email = a.Email,
                UserName = a.UserName,
                UserId = a.UserId,
                UserLoginId = a.UserLoginId
            }).ToList();

            var ordersJson = Json(accessLevels.ToJsonString(), JsonRequestBehavior.AllowGet);

            return ordersJson;
        }
    }
}
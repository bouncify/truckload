using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using truckload.Helpers;
using truckload.Helpers.Vm;

namespace truckload.Controllers
{
    [Authorize]
    public class OrderCentralController : BaseController
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitViewData(TabMenu.OrderCentral);
        }

        public ActionResult Index()
        {
            //ViewBag.IsCustomContainer = true;
            return View();
        }

        [HttpGet]
        public ActionResult GetSettings()
        {
            var settings = Db.uspGetSettings(CurrentUser.UserLoginId).Select(s => new VmNameValue()
            {
                Value = s.SettingValue,
                Name = s.SettingCode
            }).ToList();

            var newDropDownDataJson = Json(settings.ToJsonString(), JsonRequestBehavior.AllowGet);

            return newDropDownDataJson;
        }
    }
}
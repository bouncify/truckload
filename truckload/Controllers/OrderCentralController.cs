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

        [HttpGet]
        public ActionResult GetDropDownData()
        {
            var newDropDownData = new VmKoDropDownData()
            {
                DriverList = Db.Drivers.Where(d => d.IsActive).Select(r => new VmKoSelectListItem()
                {
                    ValueInt = r.DriverId,
                    Text = r.FirstName + " " + r.LastName
                }).ToList(),
                TrailerList = Db.Trailers.Where(t => t.IsActive).Select(r => new VmKoSelectListItem()
                {
                    ValueInt = r.TrailerId,
                    Text = r.TrailerDescription
                }).ToList(),
                TruckList = Db.Trucks.Where(t => t.IsActive).Select(r => new VmKoSelectListItem()
                {
                    ValueInt = r.TruckId,
                    Text = r.TruckDescription
                }).ToList(),
                LoadStatusList = Db.LoadStatus.Select(r => new VmKoSelectListItem()
                {
                    ValueInt = r.LoadStatusId,
                    Text = r.Description
                }).ToList(),
                UnitsOfMeasureList = Db.UnitOfMeasures.Select(r => new VmKoSelectListItem()
                {
                    ValueInt = r.UnitOfMeasureId,
                    Text = r.Description
                }).ToList(),
                WarehouseList = Db.Warehouses.Select(r => new VmKoSelectListItem()
                {
                    ValueInt = r.WarehouseId,
                    Text = r.Description
                }).ToList()
            };

            var newDropDownDataJson = Json(newDropDownData.ToJsonString(), JsonRequestBehavior.AllowGet);
            return newDropDownDataJson;
        }
    }
}
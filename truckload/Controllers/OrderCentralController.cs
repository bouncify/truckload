using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using truckload.Helpers;
using truckload.Helpers.Vm;
using System.Runtime.Remoting;

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

            var ordersCountList = new List<VmKoSelectListItem>();
            for (int i = 5; i < 16; i++)
            {
                ordersCountList.Add(new VmKoSelectListItem() { Text = i.ToString(), ValueInt = i });
            }
            var loadColsCountList = new List<VmKoSelectListItem>();
            for (int i = 1; i < 10; i++)
            {
                loadColsCountList.Add(new VmKoSelectListItem() { Text = i.ToString(), ValueInt = i });
            }

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
                }).ToList(),
                OrdersVisibleList = ordersCountList,
                LoadColsVisibleList = loadColsCountList
            };

            var newDropDownDataJson = Json(newDropDownData.ToJsonString(), JsonRequestBehavior.AllowGet);
            return newDropDownDataJson;
        }


        [HttpPost]
        public ActionResult SaveScreenSize(VmKoScreenSize screenSize)
        {
            try
            {
                if (CurrentUser.UserLevel < (int)Enums.AccessLevel.Entry)
                {
                    throw new ServerException("Save Order: User does not have permission to save screen size");
                }

                var dbRowSize = Db.UserSettings.FirstOrDefault(o => o.UserLoginId == CurrentUser.UserLoginId && o.SettingCode == "OrdersPageSize");
                var dbColSize = Db.UserSettings.FirstOrDefault(o => o.UserLoginId == CurrentUser.UserLoginId && o.SettingCode == "LoadsVisible");

                if (dbRowSize == null)
                {
                    Db.UserSettings.Add(new DbContext.UserSetting() {
                        SettingCode = "OrdersPageSize",
                        SettingValue = screenSize.OrdersPageSize.ToString(),
                        UserLoginId = CurrentUser.UserLoginId
                    });
                }else
                {
                    dbRowSize.SettingValue = screenSize.OrdersPageSize.ToString();
                }

                if (dbColSize == null)
                {
                    Db.UserSettings.Add(new DbContext.UserSetting()
                    {
                        SettingCode = "LoadsVisible",
                        SettingValue = screenSize.VisibleLoadCols.ToString(),
                        UserLoginId = CurrentUser.UserLoginId
                    });
                }
                else
                {
                    dbColSize.SettingValue = screenSize.VisibleLoadCols.ToString();
                }
                Db.SaveChanges();

            }
            catch (Exception e)
            {
                return ReturnScreenSize(screenSize, ServerError.GetErrorFromException(e).ExceptionMsg);
            }

            return ReturnScreenSize(screenSize, "Screen Size# has been saved");
        }

        private JsonResult ReturnScreenSize(VmKoScreenSize screenSize, string actionMessage = "")
        {
            screenSize.ActionResultMessage = actionMessage;

            var rtnScreenSize = Json(screenSize.ToJsonString(), JsonRequestBehavior.AllowGet);

            return rtnScreenSize;
        }
    }
}
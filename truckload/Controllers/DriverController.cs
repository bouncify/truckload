using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using truckload.DbContext;
using truckload.Helpers;
using truckload.Helpers.Vm;

namespace truckload.Controllers
{
    [Authorize]
    public class DriverController : BaseController
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitViewData(TabMenu.Admin);
        }

        // GET: Drivers
        public ActionResult Edit()
        {
            return View();
        }

        public ActionResult Read([DataSourceRequest] DataSourceRequest request)
        {
            DataSourceResult drivers;
            try
            {
                drivers = GetDataSourceResults.GetDrivers(request);
            }
            catch (Exception e)
            {
                drivers = new DataSourceResult() { Errors = "Drivers_Read error: " + ServerError.GetErrorFromException(e).ExceptionMsg };
            }
            return Json(drivers, JsonRequestBehavior.AllowGet);

        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Update([DataSourceRequest] DataSourceRequest request, VmDriver driver)
        {
            var isEditable = CurrentUser.UserLevel == 3;
            if (!isEditable) ModelState.AddModelError("Update", "Current user does not have permission to update drivers.");

            if (ModelState.IsValid)
            {
                var dbDriver = Db.Drivers.Find(driver.DriverId);

                if (dbDriver != null)
                {
                    dbDriver.IsActive = driver.IsActive;
                    dbDriver.IsEmployee = driver.IsEmployee;
                    dbDriver.LicenseExpireDate = driver.LicenseExpireDate;
                    dbDriver.TdgTrainingDate = driver.TdgTrainingDate;
                    dbDriver.WhmisTrainingDate = driver.WhmisTrainingDate;
                    dbDriver.Email = driver.Email;
                    dbDriver.PhoneNumber = driver.PhoneNumber;
                    dbDriver.FirstName = driver.FirstName;
                    dbDriver.LastName = driver.LastName;

                    try
                    {
                        Db.SaveChanges();

                    }
                    catch (Exception e)
                    {
                        ModelState.AddModelError("Update Driver", ServerError.GetErrorFromException(e).ExceptionMsg);
                    }
                }
            }

            return Json(new[] { driver }.ToDataSourceResult(request, ModelState));
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            var rtnString = "";

            var isEditable = CurrentUser.IsAdmin;
            if (!isEditable) rtnString += "Current user does not have permission to delete a driver.";

            if (rtnString.IsNullOrEmpty())
            {
                var dbDriver = Db.Drivers.Find(id);

                if (dbDriver != null)
                {

                    Db.Drivers.Remove(dbDriver);

                    try
                    {
                        Db.SaveChanges();
                    }
                    catch (Exception e)
                    {
                        rtnString += ServerError.GetErrorFromException(e).ExceptionMsg;
                    }
                }
            }

            if (rtnString.IsNullOrEmpty()) rtnString += $"Driver {id} has been deleted";

            var rtnJson = Json(rtnString.ToJsonString(), JsonRequestBehavior.AllowGet);
            return rtnJson;
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, VmDriver driver)
        {
            var isEditable = CurrentUser.IsAdmin;
            if (!isEditable) ModelState.AddModelError("Create", "Current user does not have permission to create a driver.");

            if (ModelState.IsValid)
            {
                try
                {
                    var newDbDriver = new Driver()
                    {
                        Email = driver.Email,
                        FirstName = driver.FirstName,
                        LastName = driver.LastName,
                        IsActive = true,
                        IsEmployee = driver.IsEmployee,
                        LicenseExpireDate = driver.LicenseExpireDate,
                        PhoneNumber = driver.PhoneNumber,
                        TdgTrainingDate = driver.TdgTrainingDate,

                        WhmisTrainingDate = driver.WhmisTrainingDate,

                    };

                    Db.Drivers.Add(newDbDriver);
                    Db.SaveChanges();
                    driver.DriverId = newDbDriver.DriverId;
                }
                catch (Exception e)
                {
                    ModelState.AddModelError("Create Driver", ServerError.GetErrorFromException(e).ExceptionMsg);
                }
            }

            return Json(new[] { driver }.ToDataSourceResult(request, ModelState));
        }
    }
}
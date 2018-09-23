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
    public class TruckController : BaseController
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitViewData();
        }

        // GET: Truck
        public ActionResult Edit()
        {
            return View();
        }

        public ActionResult Read([DataSourceRequest] DataSourceRequest request)
        {
            DataSourceResult trucks;
            try
            {
                trucks = GetDataSourceResults.GetTrucks(request);
            }
            catch (Exception e)
            {
                trucks = new DataSourceResult() { Errors = "Trucks_Read error: " + ServerError.GetErrorFromException(e).ExceptionMsg };
            }
            return Json(trucks, JsonRequestBehavior.AllowGet);

        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Update([DataSourceRequest] DataSourceRequest request, VmTruck truck)
        {
            var isEditable = CurrentUser.UserLevel == 3;
            if (!isEditable) ModelState.AddModelError("Update", "Current user does not have permission to update trucks.");

            if (ModelState.IsValid)
            {
                var dbTruck = Db.Trucks.Find(truck.TruckId);

                if (dbTruck != null)
                {
                    dbTruck.IsActive = truck.IsActive;
                    dbTruck.TruckDescription = truck.TruckDescription;
                    dbTruck.NextInspectionDate = truck.NextInspectionDate;
                    dbTruck.NextMaintenanceDate = truck.NextMaintenanceDate;

                    try
                    {
                        Db.SaveChanges();
                    }
                    catch (Exception e)
                    {
                        ModelState.AddModelError("Update truck", ServerError.GetErrorFromException(e).ExceptionMsg);
                    }
                }
            }

            return Json(new[] { truck }.ToDataSourceResult(request, ModelState));
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            var rtnString = "";

            var isEditable = CurrentUser.IsAdmin;
            if (!isEditable) rtnString += "Current user does not have permission to delete a truck.";

            if (rtnString.IsNullOrEmpty())
            {
                var dbtruck = Db.Trucks.Find(id);

                if (dbtruck != null)
                {
                    //if (dbtruck.Loads.Count > 0)
                    //{
                    //    rtnString += "This truck cannot be deleted as they have been assigned to loads, set the truck 'Inactive' instead.";
                    //}
                    //else
                    //{
                        Db.Trucks.Remove(dbtruck);

                        try
                        {
                            Db.SaveChanges();
                        }
                        catch (Exception e)
                        {
                            rtnString += ServerError.GetErrorFromException(e).ExceptionMsg;
                        }
                    //}
                }
            }

            if (rtnString.IsNullOrEmpty()) rtnString += $"Truck {id} has been deleted";

            var rtnJson = Json(rtnString.ToJsonString(), JsonRequestBehavior.AllowGet);
            return rtnJson;
        }


        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, VmTruck truck)
        {
            var isEditable = CurrentUser.IsAdmin;
            if (!isEditable) ModelState.AddModelError("Create", "Current user does not have permission to create a truck.");

            if (ModelState.IsValid)
            {
                try
                {
                    var newDbTruck = new Truck()
                    {
                        NextInspectionDate = truck.NextInspectionDate,
                        NextMaintenanceDate = truck.NextMaintenanceDate,
                        TruckDescription = truck.TruckDescription,

                        IsActive = true,
                    };

                    Db.Trucks.Add(newDbTruck);
                    Db.SaveChanges();

                    truck.TruckId = newDbTruck.TruckId;
                }
                catch (Exception e)
                {
                    ModelState.AddModelError("Create Truck", ServerError.GetErrorFromException(e).ExceptionMsg);
                }
            }

            return Json(new[] { truck }.ToDataSourceResult(request, ModelState));
        }
    }
}
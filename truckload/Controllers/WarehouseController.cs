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
    public class WarehouseController : BaseController
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitViewData(TabMenu.Admin);
        }

        public ActionResult Edit()
        {
            return View();
        }

        public ActionResult Read([DataSourceRequest] DataSourceRequest request)
        {
            DataSourceResult warehouses;
            try
            {
                warehouses = GetDataSourceResults.GetWarehouses(request);
            }
            catch (Exception e)
            {
                warehouses = new DataSourceResult() { Errors = "Warehouses_Read error: " + ServerError.GetErrorFromException(e).ExceptionMsg };
            }
            return Json(warehouses, JsonRequestBehavior.AllowGet);

        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Update([DataSourceRequest] DataSourceRequest request, VmWarehouse warehouse)
        {
            var isEditable = CurrentUser.UserLevel == 3;
            if (!isEditable) ModelState.AddModelError("Update", "Current user does not have permission to update warehouses.");

            if (ModelState.IsValid)
            {
                var dbWarehouse = Db.Warehouses.Find(warehouse.WarehouseId);

                if (dbWarehouse != null)
                {
                    dbWarehouse.Description = warehouse.Description;
                    dbWarehouse.IsActive = warehouse.IsActive;
                    try
                    {
                        Db.SaveChanges();

                    }
                    catch (Exception e)
                    {
                        ModelState.AddModelError("Update Warehouse", ServerError.GetErrorFromException(e).ExceptionMsg);
                    }
                }
            }

            return Json(new[] { warehouse }.ToDataSourceResult(request, ModelState));
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            var rtnString = "";

            var isEditable = CurrentUser.IsAdmin;
            if (!isEditable) rtnString += "Current user does not have permission to delete a warehouse.";

            if (rtnString.IsNullOrEmpty())
            {
                var dbWarehouse = Db.Warehouses.Find(id);

                if (dbWarehouse != null)
                {
                    //if (dbWarehouse.Loads.Count > 0)
                    //{
                    //    rtnString += "This warehouse cannot be deleted as they have been assigned to loads, set the warehouse 'Inactive' instead.";
                    //}
                    //else
                    //{
                    Db.Warehouses.Remove(dbWarehouse);

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

            if (rtnString.IsNullOrEmpty()) rtnString += $"Warehouse {id} has been deleted";

            var rtnJson = Json(rtnString.ToJsonString(), JsonRequestBehavior.AllowGet);
            return rtnJson;
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, VmWarehouse warehouse)
        {
            var isEditable = CurrentUser.IsAdmin;
            if (!isEditable) ModelState.AddModelError("Create", "Current user does not have permission to create a warehouse.");

            if (ModelState.IsValid)
            {
                try
                {
                    var newDbWarehouse = new Warehouse()
                    {
                        WarehouseCode = warehouse.WarehouseCode,
                        Description = warehouse.Description,
                        IsActive = true
                    };

                    Db.Warehouses.Add(newDbWarehouse);
                    Db.SaveChanges();
                    warehouse.WarehouseId = newDbWarehouse.WarehouseId;
                }
                catch (Exception e)
                {
                    ModelState.AddModelError("Create Warehouse", ServerError.GetErrorFromException(e).ExceptionMsg);
                }
            }

            return Json(new[] { warehouse }.ToDataSourceResult(request, ModelState));
        }
    }
}
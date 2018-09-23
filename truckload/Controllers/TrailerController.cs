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
    public class TrailerController : BaseController
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitViewData();
        }

        public ActionResult Edit()
        {
            ViewData["trailerTypes"] = Db.TrailerTypes;
            ViewData["unitsOfMeasure"] = Db.UnitOfMeasures;
            return View();
        }

        public ActionResult Read([DataSourceRequest] DataSourceRequest request)
        {
            DataSourceResult trailers;
            try
            {
                trailers = GetDataSourceResults.GetTrailers(request);
            }
            catch (Exception e)
            {
                trailers = new DataSourceResult() { Errors = "Trucks_Read error: " + ServerError.GetErrorFromException(e).ExceptionMsg };
            }
            return Json(trailers, JsonRequestBehavior.AllowGet);

        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Update([DataSourceRequest] DataSourceRequest request, VmTrailer trailer)
        {

            var isEditable = CurrentUser.IsAdmin;
            if (!isEditable) ModelState.AddModelError("Update", "Current user does not have permission to update trailers.");

            if (ModelState.IsValid)
            {
                var dbTrailer = Db.Trailers.Find(trailer.TrailerId);

                if (dbTrailer != null)
                {
                    dbTrailer.IsActive = trailer.IsActive;
                    dbTrailer.TrailerDescription = trailer.TrailerDescription;
                    dbTrailer.AxlesDescription = trailer.AxlesDescription;
                    dbTrailer.CapacityKg = trailer.CapacityKg;
                    dbTrailer.TrailerTypeId = trailer.TrailerTypeId;
                    dbTrailer.UnitOfMeasureId = trailer.UnitOfMeasureId;
                    dbTrailer.Volume = trailer.Volume;

                    try
                    {
                        Db.SaveChanges();
                    }
                    catch (Exception e)
                    {
                        ModelState.AddModelError("Update trailer", ServerError.GetErrorFromException(e).ExceptionMsg);
                    }
                }
            }

            return Json(new[] { trailer }.ToDataSourceResult(request, ModelState));
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            var rtnString = "";

            var isEditable = CurrentUser.IsAdmin;
            if (!isEditable) rtnString += "Current user does not have permission to delete a trailer.";

            if (rtnString.IsNullOrEmpty())
            {
                var dbTrailer = Db.Trailers.Find(id);

                if (dbTrailer != null)
                {
                    //if (dbTrailer.Loads.Count > 0)
                    //{
                    //    rtnString += "This trailer cannot be deleted as they have been assigned to loads, set the trailer 'Inactive' instead.";
                    //}
                    //else
                    //{
                        Db.Trailers.Remove(dbTrailer);

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

            if (rtnString.IsNullOrEmpty()) rtnString += $"Trailer {id} has been deleted";

            var rtnJson = Json(rtnString.ToJsonString(), JsonRequestBehavior.AllowGet);
            return rtnJson;
        }


        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, VmTrailer trailer)
        {
            var isEditable = CurrentUser.IsAdmin;
            if (!isEditable) ModelState.AddModelError("Create", "Current user does not have permission to create a trailer.");

            if (ModelState.IsValid)
            {
                try
                {
                    var newDbTrailer = new Trailer()
                    {
                        TrailerTypeId = trailer.TrailerTypeId,
                        TrailerDescription = trailer.TrailerDescription,
                        CapacityKg = trailer.CapacityKg,
                        Volume = trailer.Volume,
                        AxlesDescription = trailer.AxlesDescription,
                        UnitOfMeasureId = trailer.UnitOfMeasureId,
                        IsActive = true,
                    };

                    Db.Trailers.Add(newDbTrailer);
                    Db.SaveChanges();

                    trailer.TrailerId = newDbTrailer.TrailerId;
                }
                catch (Exception e)
                {
                    ModelState.AddModelError("Create Trailer", ServerError.GetErrorFromException(e).ExceptionMsg);
                }
            }

            return Json(new[] { trailer }.ToDataSourceResult(request, ModelState));
        }
    }
}
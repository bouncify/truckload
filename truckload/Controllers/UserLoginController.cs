using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using truckload.DbContext;
using truckload.Helpers;
using truckload.Helpers.Admin;
using truckload.Helpers.Vm;

namespace truckload.Controllers
{
    public class UserLoginController : BaseController
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitViewData();
        }

        // GET: Drivers
        public ActionResult Edit()
        {
            return View();
        }

        public ActionResult Read([DataSourceRequest] DataSourceRequest request)
        {
            DataSourceResult userLogins;
            try
            {
                var query = from h in Db.UserLogins select h;

                userLogins = query.Select(l => new VmUserLogin()
                {
                    AccessLevelId = l.AccessLevelId,
                    Email = l.Email,
                    UserName = l.UserName,
                    UserId = l.UserId,
                    UserLoginId = l.UserLoginId
                }).ToDataSourceResult(request);

            }
            catch (Exception e)
            {
                userLogins = new DataSourceResult() { Errors = "UserLogins_Read error: " + ServerError.GetErrorFromException(e).ExceptionMsg };
            }
            return Json(userLogins, JsonRequestBehavior.AllowGet);

        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Update([DataSourceRequest] DataSourceRequest request, VmUserLogin userLogin)
        {

            if (ModelState.IsValid)
            {
                var dbUserLogin = Db.UserLogins.Find(userLogin.UserLoginId);

                if (dbUserLogin != null)
                {
                    dbUserLogin.Email = userLogin.Email;
                    dbUserLogin.AccessLevelId = userLogin.AccessLevelId;
                    dbUserLogin.UserName = userLogin.UserName;
                    try
                    {
                        Db.SaveChanges();

                    }
                    catch (Exception e)
                    {
                        ModelState.AddModelError("Update User Login", ServerError.GetErrorFromException(e).ExceptionMsg);
                    }
                }
            }

            return Json(new[] { userLogin }.ToDataSourceResult(request, ModelState));
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            var rtnString = "";

            if (rtnString.IsNullOrEmpty())
            {
                var dbUserLogin = Db.UserLogins.Find(id);

                if (dbUserLogin != null)
                {

                    Db.UserLogins.Remove(dbUserLogin);

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

            if (rtnString.IsNullOrEmpty()) rtnString += $"User Login {id} has been deleted";

            var rtnJson = Json(rtnString.ToJsonString(), JsonRequestBehavior.AllowGet);
            return rtnJson;
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, VmUserLogin userLogin)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ObjectParameter returnMsgObj = new ObjectParameter("responseMessage", typeof(string));
                    ObjectParameter returnIntObj = new ObjectParameter("newId", typeof(int));
                    Db.uspAddUser(userLogin.UserId, userLogin.UserId, "TempPassword9", userLogin.Email, returnMsgObj, returnIntObj);
                    var outMsg = returnMsgObj.Value.ToString();

                    if (outMsg != "Success")
                    {
                        ModelState.AddModelError("Create User Login", outMsg);
                    }
                    else
                    {
                        userLogin.UserLoginId = (int)returnIntObj.Value;
                    }
                }
                catch (Exception e)
                {
                    ModelState.AddModelError("Create User Login", ServerError.GetErrorFromException(e).ExceptionMsg);
                }
            }

            return Json(new[] { userLogin }.ToDataSourceResult(request, ModelState));
        }

    }
}
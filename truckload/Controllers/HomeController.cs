using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using truckload.DbContext;
using truckload.Vm;

namespace truckload.Controllers
{
    [Authorize]
    public class HomeController : BaseController
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitViewData();
        }

        public ActionResult Index()
        {

            return View();
        }


    }
}
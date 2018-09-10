using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using truckload.DbContext;
using truckload.Vm;

namespace truckload.Controllers
{
    public class BaseController : Controller
    {
        readonly truckloadEntities _db;
        VmUser _currentUser;

        public BaseController()
        {
            Database.SetInitializer<truckloadEntities>(null);
            _db = new truckloadEntities();
        }

        public void InitViewData()
        {

            string currentUserId = User.Identity.GetUserId();
            //var currentUser = _db.UserLogins
            //    .Where(x => x.UserLoginId == currentUserId)
            //    .Select(n => new VmUser()
            //    {
            //        DisplayName = n.Email,
            //        EmailAddress = n.Email,
            //        IsAdmin = n.AccessLevelId == 3,
            //        UserLevel = n.AccessLevel.AccessLevelId,
            //        UserLevelDescription = n.AccessLevel.Description
            //    }).FirstOrDefault();

            var isLoggedIn = true;//currentUser != null;
            ViewBag.IsLoggedIn = isLoggedIn;

            if (isLoggedIn)
            {
                //_currentUser = currentUser;
            }
        }

    }
}
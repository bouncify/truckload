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
            string currentUserId = User.Identity.Name;

            var currentUser = _db.UserLogins
                .Where(x => x.UserId == currentUserId)
                .Select(n => new VmUser()
                {
                    DisplayName = n.UserName,
                    EmailAddress = n.Email,
                    IsAdmin = n.AccessLevelId == 3,
                    UserLevel = n.AccessLevel.AccessLevelId,
                    UserLevelDescription = n.AccessLevel.Description
                }).FirstOrDefault();

            var isLoggedIn = currentUser != null;
            ViewBag.IsLoggedIn = isLoggedIn;

            if (isLoggedIn)
            {
                _currentUser = currentUser;

                ViewBag.SiteUrl = GetSiteUrl();
                ViewBag.IsAdmin = currentUser.IsAdmin;
                ViewData.Add("DisplayName",currentUser.DisplayName);
                ViewData.Add("AccessLevel", currentUser.UserLevelDescription);
            }
        }

        private string GetSiteUrl()
        {
            var appPath = "";
            var siteUrl = "";

            if (Request.ApplicationPath != null && Request.ApplicationPath.Length > 1)
            {
                appPath = Request.ApplicationPath;

            }
            if (Request.Url != null)
            {
                siteUrl = Request.Url.AbsoluteUri;
                if (Request.Path.Length > 1) siteUrl = siteUrl.Replace(Request.Path, "") + "/";
                if (appPath.Length > 1) siteUrl += appPath.Replace("/", "") + "/";
            }
            return siteUrl;
        }

    }
}
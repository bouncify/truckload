using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using truckload.DbContext;
using truckload.Helpers;
using truckload.Vm;

namespace truckload.Controllers
{
    public class BaseController : Controller
    {
        public readonly truckloadEntities Db;
        VmUser _currentUser;

        public BaseController()
        {
            //Database.SetInitializer<truckloadEntities>(null);
            Db = new truckloadEntities();
        }

        public void InitViewData()
        {
            var currentUserId = User.Identity.Name;
            var isLoggedIn = false;

            if (!currentUserId.IsNullOrEmpty())
            {
                var currentUser = Db.UserLogins
                    .Where(x => x.UserId == currentUserId)
                    .Select(n => new VmUser()
                    {
                        DisplayName = n.UserName,
                        EmailAddress = n.Email,
                        IsAdmin = n.AccessLevelId == 3,
                        UserLevel = n.AccessLevel.AccessLevelId,
                        UserLevelDescription = n.AccessLevel.Description
                    }).FirstOrDefault();

                isLoggedIn = currentUser != null;

                if (isLoggedIn)
                {
                    _currentUser = currentUser;

                    ViewBag.SiteUrl = GetSiteUrl();
                    ViewBag.IsAdmin = currentUser.IsAdmin;
                    ViewData.Add("DisplayName", currentUser.DisplayName);
                    ViewData.Add("AccessLevel", currentUser.UserLevelDescription);
                }
            }
            ViewBag.IsLoggedIn = isLoggedIn;
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
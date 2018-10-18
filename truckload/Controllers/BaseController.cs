using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using truckload.DbContext;
using truckload.Helpers;
using truckload.Helpers.Vm;

namespace truckload.Controllers
{
    public class BaseController : Controller
    {
        public readonly truckloadEntities Db;
        public VmUser CurrentUser;

        public BaseController()
        {
            //Database.SetInitializer<truckloadEntities>(null);
            Db = new truckloadEntities();
        }

        public enum TabMenu
        {
            Default,
            OrderCentral,
            Views,
            Admin
        }

        public void InitViewData(TabMenu tabMenu = TabMenu.Default)
        {
            var currentUserId = User.Identity.Name;
            var isLoggedIn = false;

            if (!currentUserId.IsNullOrEmpty())
            {
                var currentUser = Db.UserLogins
                    .Where(x => x.UserId == currentUserId)
                    .Select(n => new VmUser()
                    {
                        UserLoginId = n.UserLoginId,
                        DisplayName = n.UserName,
                        EmailAddress = n.Email,
                        IsAdmin = n.AccessLevelId == 3,
                        UserLevel = n.AccessLevel.AccessLevelId,
                        UserLevelDescription = n.AccessLevel.Description
                    }).FirstOrDefault();

                isLoggedIn = currentUser != null;

                if (isLoggedIn)
                {
                    CurrentUser = currentUser;
                    ViewBag.IsAdmin = currentUser.IsAdmin;
                    ViewData.Add("DisplayName", currentUser.DisplayName);
                    ViewData.Add("AccessLevel", currentUser.UserLevelDescription);
                }
            }

            ViewBag.MenuOrderCentral = tabMenu == TabMenu.OrderCentral ? "active" : "";
            ViewBag.MenuViews = tabMenu == TabMenu.Views ? "active" : "";
            ViewBag.MenuAdmin = tabMenu == TabMenu.Admin ? "active" : "";

            ViewBag.SiteUrl = GetSiteUrl();
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
                if (siteUrl.Contains("?"))
                {
                    siteUrl = siteUrl.Split('?')[0];
                }

                if (Request.Path.Length > 1) siteUrl = siteUrl.Replace(Request.Path, "") + "/";
                if (appPath.Length > 1) siteUrl += appPath.Replace("/", "") + "/";
            }
            return siteUrl;
        }

    }
}
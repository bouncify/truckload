using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace truckload.Hubs
{
    public class LoadHub : Hub
    {
        [HubMethodName("refreshRequest")]
        public static void RefreshRequest()
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<LoadHub>();
            context.Clients.All.refreshRequest();
        }

        [HubMethodName("update")]
        public static void Update(long loadId, DateTime loadDate)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<LoadHub>();
            context.Clients.All.update(loadId, loadDate);
        }

        [HubMethodName("delete")]
        public static void Delete(long loadId, DateTime loadDate)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<LoadHub>();
            context.Clients.All.delete(loadId, loadDate);
        }

        [HubMethodName("add")]
        public static void Add(long loadId, DateTime loadDate)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<LoadHub>();
            context.Clients.All.add(loadId);
        }
    }
}
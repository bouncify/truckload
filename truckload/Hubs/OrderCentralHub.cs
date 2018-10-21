using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace truckload.Hubs
{
    public class OrderCentralHub : Hub
    {
        [HubMethodName("refreshRequest")]
        public static void RefreshRequest()
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<OrderCentralHub>();
            context.Clients.All.refreshRequest();
        }

        [HubMethodName("update")]
        public static void Update(long loadId, DateTime loadDate,bool isLoad)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<OrderCentralHub>();
            context.Clients.All.update(loadId, loadDate, isLoad);
        }

        [HubMethodName("delete")]
        public static void Delete(long loadId, DateTime loadDate, bool isLoad)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<OrderCentralHub>();
            context.Clients.All.delete(loadId, loadDate, isLoad);
        }

        [HubMethodName("add")]
        public static void Add(long loadId, DateTime loadDate, bool isLoad)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<OrderCentralHub>();
            context.Clients.All.add(loadId, loadDate, isLoad);
        }
    }
}
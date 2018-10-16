using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace truckload.Hubs
{
    public class OrderHub : Hub
    {
        [HubMethodName("refreshRequest")]
        public static void RefreshRequest()
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<OrderHub>();
            context.Clients.All.refreshRequest();
        }

        [HubMethodName("update")]
        public static void Update(long orderId)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<OrderHub>();
            context.Clients.All.update(orderId);
        }

        [HubMethodName("delete")]
        public static void Delete(long orderId)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<OrderHub>();
            context.Clients.All.delete(orderId);
        }

        [HubMethodName("add")]
        public static void Add(long orderId)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<OrderHub>();
            context.Clients.All.add(orderId);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using truckload.DbContext;
using truckload.Hubs;
using TableDependency.SqlClient;
using TableDependency.SqlClient.Base.Enums;
using TableDependency.SqlClient.Base.EventArgs;

namespace truckload.Helpers.Repositories
{
    public class OrderRepository
    {
        readonly string _connString = ConfigurationManager.ConnectionStrings["truckloadDb"].ConnectionString;
        private SqlTableDependency<Order> _tableDependency;

        public void StartDependency()
        {
            var tableName = "Order";

            _tableDependency = new SqlTableDependency<Order>(_connString, tableName, "dbo");

            _tableDependency.OnChanged += dependency_OnChange;
            _tableDependency.Start();

        }

        public void StopDependency()
        {
            _tableDependency.Stop();
        }

        private void dependency_OnChange(object sender, RecordChangedEventArgs<Order> e)
        {
            switch (e.ChangeType)
            {
                case ChangeType.None:
                    return;
                case ChangeType.Update:
                    if (e.Entity.LoadId != null)
                    {
                        OrderCentralHub.Delete(e.Entity.OrderId,DateTime.Now, false);
                    }
                    else
                    {
                        OrderCentralHub.Update(e.Entity.OrderId, DateTime.Now, false);
                    }
                    break;
                case ChangeType.Delete:
                    OrderCentralHub.Delete(e.Entity.OrderId, DateTime.Now, false);
                    break;
                case ChangeType.Insert:
                    OrderCentralHub.Add(e.Entity.OrderId, DateTime.Now, false);
                    break;
                default:
                    OrderCentralHub.RefreshRequest();
                    break;
            }
        }
    }
}
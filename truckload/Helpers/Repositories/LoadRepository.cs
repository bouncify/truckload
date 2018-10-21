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
    public class LoadRepository
    {
        readonly string _connString = ConfigurationManager.ConnectionStrings["truckloadDb"].ConnectionString;
        private SqlTableDependency<Load> _tableDependency;

        public void StartDependency()
        {
            var tableName = "Load";

            _tableDependency = new SqlTableDependency<Load>(_connString, tableName, "dbo");

            _tableDependency.OnChanged += dependency_OnChange;
            _tableDependency.Start();

        }

        public void StopDependency()
        {
            _tableDependency.Stop();
        }

        private void dependency_OnChange(object sender, RecordChangedEventArgs<Load> e)
        {
            switch (e.ChangeType)
            {
                case ChangeType.None:
                    return;
                case ChangeType.Update:
                    OrderCentralHub.Update(e.Entity.LoadId, e.Entity.LoadDate, true);
                    break;
                case ChangeType.Delete:
                    OrderCentralHub.Delete(e.Entity.LoadId, e.Entity.LoadDate, true);
                    break;
                case ChangeType.Insert:
                    OrderCentralHub.Add(e.Entity.LoadId, e.Entity.LoadDate, true);
                    break;
                default:
                    OrderCentralHub.RefreshRequest();
                    break;
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using truckload.DbContext;
using truckload.Helpers.Vm;

namespace truckload.Helpers
{
    public static class GetDataSourceResults
    {
        public static DataSourceResult GetDrivers([DataSourceRequest] DataSourceRequest request)
        {
            DataSourceResult drivers;
            using (var db = new truckloadEntities())
            {
                var query = from h in db.Drivers select h;

                drivers = query.Select(d => new VmDriver()
                {
                    DriverId = d.DriverId,
                    Email = d.Email,
                    FirstName = d.FirstName,
                    LastName = d.LastName,
                    IsActive = d.IsActive,
                    IsEmployee = d.IsEmployee,
                    PhoneNumber = d.PhoneNumber,
                    TdgTrainingDate = d.TdgTrainingDate,
                    WhmisTrainingDate = d.WhmisTrainingDate,
                    LicenseExpireDate = d.LicenseExpireDate,
                }).ToDataSourceResult(request);
            }

            return drivers;
        }

        public static DataSourceResult GetTrucks([DataSourceRequest] DataSourceRequest request)
        {
            DataSourceResult trucks;
            using (var db = new truckloadEntities())
            {
                var query = from h in db.Trucks select h;

                trucks = query.Select(d => new VmTruck()
                {
                    TruckId = d.TruckId,
                    TruckDescription = d.TruckDescription,
                    NextInspectionDate = d.NextInspectionDate,
                    NextMaintenanceDate = d.NextMaintenanceDate,
                    IsActive = d.IsActive,
                }).ToDataSourceResult(request);
            }

            return trucks;
        }

        public static DataSourceResult GetTrailers([DataSourceRequest] DataSourceRequest request)
        {
            DataSourceResult trailers;
            using (var db = new truckloadEntities())
            {
                var query = from h in db.Trailers select h;

                trailers = query.Select(d => new VmTrailer()
                {
                    TrailerId = d.TrailerId,
                    TrailerDescription = d.TrailerDescription,
                    AxlesDescription = d.AxlesDescription,
                    CapacityKg = d.CapacityKg,
                    TrailerTypeId = d.TrailerTypeId,
                    UnitOfMeasureId = d.UnitOfMeasureId,
                    Volume = d.Volume,
                    IsActive = d.IsActive,
                }).ToDataSourceResult(request);
            }

            return trailers;
        }
    }
}
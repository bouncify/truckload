using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.Remoting;
using System.Web;
using System.Web.Mvc;
using truckload.DbContext;
using truckload.Helpers;
using truckload.Helpers.Vm;

namespace truckload.Controllers
{
    [Authorize]
    public class LoadsController : BaseController
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitViewData(TabMenu.Admin);
        }

        [HttpPost]
        public ActionResult CreateNewLoad(VmKoLoad load)
        {
            long newLoadId = 0;
            try
            {
                if (CurrentUser.UserLevel < (int)Enums.AccessLevel.Dispatcher)
                {
                    throw new ServerException("Create Load: User does not have permission to create a load");
                }

                int? unitOfMeasure = null;

                var dbTrailer = Db.Trailers.Find(load.TrailerId);
                if (dbTrailer != null)
                {
                    unitOfMeasure = dbTrailer.UnitOfMeasureId;
                }

                var dbLoad = new Load
                {
                    CreatedByUserLoginId = CurrentUser.UserLoginId,
                    DriverId = load.DriverId,
                    LoadStatusId = 1,
                    CreatedDate = DateTime.Now,
                    LoadDate = load.LoadDate.Date,
                    TrailerId = load.TrailerId,
                    TruckId = load.TruckId,
                    UnitOfMeasureId = unitOfMeasure
                };

                Db.Loads.Add(dbLoad);
                Db.SaveChanges();

                newLoadId = dbLoad.LoadId;
            }
            catch (Exception e)
            {
                return ReturnLoad(load, ServerError.GetErrorFromException(e).ExceptionMsg);
            }

            return ReturnLoad(load, $"Load {newLoadId} has been saved");
        }

        [HttpPost]
        public ActionResult DeleteLoad(long loadId)
        {
            try
            {
                if (CurrentUser.UserLevel < (int)Enums.AccessLevel.Dispatcher)
                {
                    throw new ServerException("Delete Load: User does not have permission to delete a load");
                }

                var dbLoad = Db.Loads.Find(loadId) ?? throw new InvalidOperationException();

                foreach (var order in dbLoad.Orders)
                {
                    order.LoadId = null;
                }

                Db.SaveChanges();//Remove orders from load

                Db.Loads.Remove(dbLoad);
                Db.SaveChanges();
            }
            catch (Exception e)
            {
                return ReturnLoad(new VmKoLoad(), ServerError.GetErrorFromException(e).ExceptionMsg);
            }

            return ReturnLoad(new VmKoLoad(), $"Load {loadId} has been deleted");
        }

        [HttpGet]
        public ActionResult GetLoadsByDate(DateTime loadDate)
        {
            var orders = GetLoadsList(loadDate.Date);
            var ordersJson = Json(orders.ToJsonString(), JsonRequestBehavior.AllowGet);
            return ordersJson;
        }

        private List<VmKoLoad> GetLoadsList(DateTime? loadDate = null, long? loadId = null)
        {
            var isSingleLoad = loadId != null;

            var query = from h in Db.Loads select h;


            query = isSingleLoad ?
                query.Where(l => l.LoadId == loadId) :
                query.Where(l => DbFunctions.TruncateTime(l.LoadDate) == loadDate);

            var loads = query.Select(d => new VmKoLoad()
            {
                LoadId = d.LoadId,
                LoadDate = d.LoadDate,

                DriverId = d.DriverId,
                DriverName = d.Driver.FirstName + " " + d.Driver.LastName,

                UnitOfMeasureId = d.UnitOfMeasureId,
                UnitTypeDescription = d.UnitOfMeasureId == null ? "" : d.UnitOfMeasure.Description,

                LoadCapacityKg = d.TrailerId == null ? 0 : d.Trailer.CapacityKg,
                CurrentLoadWeightKg = d.Orders.Any() ? d.Orders.Sum(o => o.WeightKg) : 0,

                CurrentUnitCount = d.Orders.Sum(e => e.Volume) ?? 0,
                UnitCapacity = d.TrailerId == null ? 0 : d.Trailer.Volume,

                TrailerId = d.TrailerId,

                TruckDescription = d.Truck.TruckDescription,
                TrailerDescription = d.TrailerId == null ? "" : d.Trailer.TrailerDescription,
                LastChangeDate = d.ModifiedDate ?? d.CreatedDate,
                LoadStatusId = d.LoadStatusId,
                TruckId = d.TruckId,
                UserName = d.UserLogin1.UserName ?? d.UserLogin.UserName,
                OrdersList = d.Orders.Select(s => new VmKoOrder()
                {
                    OrderId = s.OrderId,
                    OrderNumber = s.OrderNumber,
                    CustomerName = s.CustomerName,
                    CustomerAddress = s.CustAddress,
                    UserName = d.UserLogin1.UserName ?? d.UserLogin.UserName,
                    LastChangeDate = s.ModifiedDate ?? s.CreatedDate,
                    UnitDescription = "" + s.Volume + " " + s.UnitOfMeasure.Description + " / " + s.WeightKg + "KG",
                    PickupDate = s.PickupDate,
                    DeliveryDate = s.DeliveryDate,
                    WarehouseDescription = s.Warehouse.Description,
                    IsCustomerPickup = s.IsCustomerPickup,
                    IsDangerousGoods = s.IsDangerousGoods,
                    IsDraggable = CurrentUser.UserLevel > 1 && d.LoadStatusId == 1,
                    LoadSort = s.LoadSort ?? 0
                }).OrderBy(o => o.LoadSort).ToList()
            }).ToList();

            return loads;
        }
    }
}
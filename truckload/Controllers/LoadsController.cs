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
        public ActionResult SaveEditedLoad(VmKoLoad load)
        {
            try
            {
                if (CurrentUser.UserLevel < (int)Enums.AccessLevel.Dispatcher)
                {
                    throw new ServerException($"Save Load: User does not have permission to save load {load.LoadId}");
                }

                var dbLoad = Db.Loads.Find(load.LoadId);

                if (dbLoad == null) throw new ServerException($"SaveEditedLoad: Cannot find load {load.LoadId}");

                dbLoad.DriverId = load.DriverId;
                dbLoad.TruckId = load.TruckId;
                dbLoad.LoadStatusId = load.LoadStatusId;
                dbLoad.LoadDate = load.LoadDate;

                var isChangeTrailer = dbLoad.TrailerId != load.TrailerId;

                var isReOrderItems = false;

                if (load.NewOrderSequence != null)
                {
                    var currentOrderSequence = dbLoad.Orders.OrderBy(r => r.LoadSort).Select(o => o.OrderId).ToArray();
                    isReOrderItems = !currentOrderSequence.SequenceEqual(load.NewOrderSequence);
                }

                if (isReOrderItems)
                {
                    var position = 1;
                    foreach (var orderId in load.NewOrderSequence)
                    {
                        var dbOrder = dbLoad.Orders.FirstOrDefault(o => o.OrderId == orderId);

                        if (dbOrder != null)
                        {
                            dbOrder.LoadSort = position;
                            position++;
                        }
                    }
                }

                if (isChangeTrailer)
                {
                    int? unitOfMeasure = null;

                    var dbTrailer = Db.Trailers.Find(load.TrailerId);
                    if (dbTrailer != null)
                    {
                        unitOfMeasure = dbTrailer.UnitOfMeasureId;
                    }

                    dbLoad.UnitOfMeasureId = unitOfMeasure;
                }

                dbLoad.TrailerId = load.TrailerId;

                dbLoad.ModifiedByUserLoginId = CurrentUser.UserLoginId;
                dbLoad.ModifiedDate = DateTime.Now;

                Db.SaveChanges();

            }
            catch (Exception e)
            {
                return ReturnLoad(load, ServerError.GetErrorFromException(e).ExceptionMsg);
            }

            return ReturnLoad(load, $"Load {load.LoadId} has been saved");
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
        public ActionResult GetLoad(long loadId)
        {
            var loads = GetLoadsList(null, loadId);

            if (loads != null)
            {
                if (loads.Count == 1)
                {
                    var load = loads.FirstOrDefault();
                    return Json(load.ToJsonString(), JsonRequestBehavior.AllowGet);
                }
            }

            throw new ServerException($"Cannot find load {loadId}");
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
                    LoadSort = s.LoadSort ?? 0,
                    WarehouseId = s.WarehouseId,
                    UnitOfMeasureId = s.UnitOfMeasureId,
                    Destination = s.Destination,
                    Notes = s.Notes,
                    Volume = s.Volume ?? 0,
                    WeightKg = s.WeightKg
                }).OrderBy(o => o.LoadSort).ToList()
            }).ToList();

            return loads;
        }

        [HttpPost]
        public ActionResult DropOrder(long orderId, long loadId)
        {
            var result = new VmDragDropResult()
            {
                LoadId = loadId,
                OrderId = orderId
            };

            try
            {
                if (CurrentUser.UserLevel < (int)Enums.AccessLevel.Dispatcher)
                {
                    throw new ServerException("Drop Order: User does not have permission to move orders.");
                }

                var dbOrder = Db.Orders.FirstOrDefault(o => o.OrderId == orderId);

                if (dbOrder != null)
                {
                    var isFromOrderList = dbOrder.LoadId == null;
                    var isMovedFromAnotherLoad = !isFromOrderList && dbOrder.LoadId != loadId;

                    if (isMovedFromAnotherLoad)
                    {
                        var previousLoad = Db.Loads.Find(dbOrder.LoadId);

                        if (previousLoad != null)
                        {
                            previousLoad.ModifiedDate = DateTime.Now;
                            previousLoad.ModifiedByUserLoginId = CurrentUser.UserLoginId;
                        }
                    }

                    if (isFromOrderList || isMovedFromAnotherLoad)
                    {
                        var dbLoad = Db.Loads.Find(loadId);
                        if (dbLoad != null)
                        {
                            if (dbLoad.LoadStatusId == 1)
                            {
                                dbOrder.LoadId = loadId;

                                dbLoad.ModifiedDate = DateTime.Now;
                                dbLoad.ModifiedByUserLoginId = CurrentUser.UserLoginId;

                                var maxLoadSortNum = Db.Orders.Where(o => o.LoadId == dbOrder.LoadId).Max(o => o.LoadSort) ?? 0;
                                dbOrder.LoadSort = maxLoadSortNum + 1;
                            }
                        }
                    }

                    Db.SaveChanges();
                }
            }
            catch (Exception e)
            {
                result.Message = ServerError.GetErrorFromException(e).ExceptionMsg;
                return Json(result.ToJsonString(), JsonRequestBehavior.AllowGet);
            }

            result.Message = $"OrderId {orderId} has been moved to loadId {loadId}";
            return Json(result.ToJsonString(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ResetOrder(long orderId)
        {
            long oldLoadId = 0;
            var result = new VmDragDropResult();

            try
            {
                if (CurrentUser.UserLevel < (int)Enums.AccessLevel.Dispatcher)
                {
                    throw new ServerException("Reset Order: User does not have permission to move orders.");
                }

                var dbOrder = Db.Orders.FirstOrDefault(o => o.OrderId == orderId);

                if (dbOrder != null)
                {
                    oldLoadId = dbOrder.LoadId ?? 0;

                    var previousLoad = Db.Loads.Find(oldLoadId);

                    if (previousLoad != null)
                    {
                        previousLoad.ModifiedDate = DateTime.Now;
                        previousLoad.ModifiedByUserLoginId = CurrentUser.UserLoginId;
                    }

                    dbOrder.LoadId = null;
                    Db.SaveChanges();

                    result.LoadId = oldLoadId;
                    result.OrderId = orderId;
                }
            }
            catch (Exception e)
            {
                result.Message = ServerError.GetErrorFromException(e).ExceptionMsg;
                return Json(result.ToJsonString(), JsonRequestBehavior.AllowGet);
            }

            result.Message = $"OrderId {orderId} has been removed from loadId {oldLoadId}";
            return Json(result.ToJsonString(), JsonRequestBehavior.AllowGet);
        }
    }
}
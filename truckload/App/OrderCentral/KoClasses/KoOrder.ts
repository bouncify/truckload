
export class KoOrder {
    orderId = ko.observable(0);
    orderNumber = ko.observable("");
    customerName = ko.observable("");
    customerAddress = ko.observable("");
    lastChangeDate = ko.observable(new Date());
    userName = ko.observable("");
    unitDescription = ko.observable("");
    pickupDate = ko.observable(new Date());
    deliveryDate = ko.observable(new Date());
    warehouseDescription = ko.observable("");
    isDangerousGoods = ko.observable(false);
    isCustomerPickup = ko.observable(false);
    isDraggable = ko.observable(false);
    loadSort = ko.observable(0);

    //extra fields
    lastChangeDetail = "";
    pickupDateText = "";
    deliveryDateText = "";
    orderColor = "";
}
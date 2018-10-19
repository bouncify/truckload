import { KoOrder } from "../KoClasses/KoOrder"
import { KoEditOrder } from "../KoClasses/KoEditOrder"
import { KoScreenSize } from "../KoClasses/KoScreenSize"
import { OrderMessageService } from "../Classes/OrderMessageService"
import { DbOperation, CrudMessage } from "../../Shared/Global"
import { SharedModel } from "./SharedModel"
import { StringFunctions } from "../../Shared/StringFunctions"
import { DateFunctions } from "../../Shared/DateFunctions"
import { ControlHelper } from "../../Shared/ControlHelper"

import * as moment from 'moment';
import * as ko from 'knockout';
 
export class OrderModel {
    //private setWaitSpinner: Function;
    //private orderGridName: string;
    private sharedModel:SharedModel;
    private orders = ko.observableArray([] as KoOrder[]);
    private editOrder: KoEditOrder;
    private screenSize: KoScreenSize;
    private orderService: OrderMessageService;

    private orderNumberFilterText = "";

    private sortOrders() {
        this.orders.sort(function (left, right) {
            return left.deliveryDate() === right.deliveryDate()
                ? (left.orderId() < right.orderId() ? 1 : -1)
                : (left.deliveryDate() < right.deliveryDate() ? -1 : 1);
        });
    }

    public loadAll(orderNumberFilter: string = "") {
        this.sharedModel.setWaitSpinner(true, this.sharedModel.orderGridName);
        this.orders.removeAll();
        var dataToSend = JSON.parse("{ \"orderNumberFilter\" : \"" + orderNumberFilter + "\"}");
        this.sharedModel.ajax.get("/Orders/GetOrders", (data: any) => {
            ko.mapping.fromJSON(data, {}, this.orders);

            $.each(this.orders(), (index, order) => {
                this.populateExtraFields(order);
            });

            this.sortOrders();
            this.sharedModel.setWaitSpinner(false, this.sharedModel.orderGridName);
        }, dataToSend);
    }

    private populateExtraFields(order: KoOrder) {
        const changeDetail = StringFunctions.getInitialsFromName(order.userName()) + " - " + DateFunctions.formatDateTime(order.lastChangeDate());
        order.lastChangeDetail = changeDetail;
        order.pickupDateText = DateFunctions.formatDate(order.pickupDate());
        order.deliveryDateText = DateFunctions.formatDate(order.deliveryDate());

        var orderColor = "#0169a1";//default
        var green = "#4a9404";
        var orange = "#d77706";

        var deliveryDate = moment(order.deliveryDate());
        var now = moment();

        if (deliveryDate <= now) orderColor = orange;

        if (order.isCustomerPickup()) orderColor = green;

        order.orderColor = orderColor;
    }

    public setOrderFilter() {
        ControlHelper.lbPrompt("Enter Order Number:", (result: boolean, resultString: string) => {
            if (result) {
                this.orderNumberFilterText = resultString;

                this.loadAll(this.orderNumberFilterText);

                var filterIcon = $("#orderFilterIcon");

                if (this.orderNumberFilterText) {
                    filterIcon.css("color", "red");
                } else {
                    filterIcon.css("color", "black");
                }
            }
        }, "Order Filter", this.orderNumberFilterText);
    }

    public setScreenSize() {
        this.screenSize.edit();
    }

    public addOrder() {
        this.editOrder.new();
    }

    public editOrderClick = (data: KoOrder) => {
        this.editOrder.edit(data);
    }

    public receiveDbUpdateOrderNotification = (message: CrudMessage) => {
        var dataToSend = JSON.parse("{ \"orderId\" : " + message.id + "}");
        console.log(message.id);
        switch (message.operation) {
            case DbOperation.Create:
                this.sharedModel.ajax.get("/Orders/GetOrder", (data: any) => {
                    var newOrder = ko.mapping.fromJSON(data);
                    this.populateExtraFields(newOrder);
                    this.orders.push(newOrder);
                    this.sortOrders();
                    this.sharedModel.setWaitSpinner(false,this.sharedModel.orderGridName);
                }, dataToSend);
                break;
            case DbOperation.Read:
                break;
            case DbOperation.Update:
                this.sharedModel.ajax.get("/Orders/GetOrder", (data: any) => {
                    var newOrder = ko.mapping.fromJSON(data);
                    this.populateExtraFields(newOrder);
                    var oldOrder = ko.utils.arrayFirst(this.orders(), item => item.orderId() === message.id);
                    if (oldOrder) {
                        this.orders.replace(oldOrder, newOrder);
                    } else {
                        this.populateExtraFields(newOrder);
                        this.orders.push(newOrder);
                    }
                    this.sortOrders();
                    this.sharedModel.setWaitSpinner(false, this.sharedModel.orderGridName);
                }, dataToSend);
                break;
            case DbOperation.Delete:
                var order = ko.utils.arrayFirst(this.orders(), item => item.orderId() === message.id);
                if (order) this.orders.remove((x: any) => x.orderId === order.orderId);
                this.sortOrders();
                this.sharedModel.setWaitSpinner(false, this.sharedModel.orderGridName);
                break;
        }
    }

    constructor(sharedModel:SharedModel) {
        this.sharedModel = sharedModel;
        this.editOrder = new KoEditOrder(sharedModel);
        this.screenSize = new KoScreenSize(sharedModel);

        this.loadAll();

        this.orderService = new OrderMessageService(this.receiveDbUpdateOrderNotification);

    }
}
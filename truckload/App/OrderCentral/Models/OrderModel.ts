import { KoOrder } from "../KoClasses/KoOrder"
import { KoEditOrder } from "../KoClasses/KoEditOrder"
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

    private orderNumberFilterText = "";

    public loadAll(orderNumberFilter: string = "") {
        this.sharedModel.setWaitSpinner(true, this.sharedModel.orderGridName);
        this.orders.removeAll();
        var dataToSend = JSON.parse("{ \"orderNumberFilter\" : \"" + orderNumberFilter + "\"}");
        this.sharedModel.ajax.get("/Orders/GetOrders", (data: any) => {
            ko.mapping.fromJSON(data, {}, this.orders);

            $.each(this.orders(), (index, order) => {
                this.populateExtraFields(order);
            });

            //this.sortOrders();
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
    
    public addOrder() {
        this.editOrder.new();
    }

    public editOrderClick = (data: KoOrder) => {
        this.editOrder.edit(data);
    }

    constructor(sharedModel:SharedModel) {
        this.sharedModel = sharedModel;
        this.editOrder = new KoEditOrder(sharedModel);

        this.loadAll();
    }
}
import { KoOrder } from "../KoClasses/KoOrder"
import { AjaxHelper } from "../../Shared/Classes/AjaxHelper"
import { StringFunctions } from "../../Shared/StringFunctions"
import { DateFunctions } from "../../Shared/DateFunctions"
import { ControlHelper } from "../../Shared/ControlHelper"

import * as moment from 'moment';
import * as ko from 'knockout';

export class OrderModel {
    private setWaitSpinner: Function;
    private orderGridName: string;
    private orders = ko.observableArray([] as KoOrder[]);
    private ajaxHelper = new AjaxHelper();
    private orderNumberFilterText = "";

    public loadAll(orderNumberFilter: string = "") {
        this.setWaitSpinner(true, this.orderGridName);
        this.orders.removeAll();
        var dataToSend = JSON.parse("{ \"orderNumberFilter\" : \"" + orderNumberFilter + "\"}");
        this.ajaxHelper.get("/Orders/GetOrders", (data: any) => {
            ko.mapping.fromJSON(data, {}, this.orders);

            $.each(this.orders(), (index, order) => {
                this.populateExtraFields(order);
            });

            //this.sortOrders();
            this.setWaitSpinner(false, this.orderGridName);
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

                //viewModelOrders.loadAll(orderNumberFilterText);

                var filterIcon = $("#orderFilterIcon");

                if (this.orderNumberFilterText) {
                    filterIcon.css("color", "red");
                } else {
                    filterIcon.css("color", "black");
                }
            }
        }, "Order Filter", this.orderNumberFilterText);
    }

    constructor(setWaitSpinner: Function, orderGridName: string) {
        this.setWaitSpinner = setWaitSpinner;
        this.orderGridName = orderGridName;
        this.loadAll();
    }
}
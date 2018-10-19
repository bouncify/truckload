import { AjaxHelper } from "../../Shared/Classes/AjaxHelper"
import { DateFunctions } from "../../Shared/DateFunctions"
import { SharedModel } from "../Models/SharedModel"
import * as ko from 'knockout';

import { ControlHelper } from "../../Shared/ControlHelper"
import { KoOrder } from "./KoOrder"

export class KoEditOrder {
    public shared: SharedModel;
    private isNewOrder = false;

    orderId = ko.observable(0);
    warehouseId = ko.observable(0);
    orderNumber = ko.observable("");
    customerName = ko.observable("");
    customerAddress = ko.observable("");
    destination = ko.observable("");
    volume = ko.observable(0);
    unitOfMeasureId = ko.observable(0);
    weightKg = ko.observable(0);
    pickupDate = ko.observable(new Date());
    deliveryDate = ko.observable(new Date());
    isDangerousGoods = ko.observable(false);
    isCustomerPickup = ko.observable(false);
    notes = ko.observable("");
    lastChangeDate = ko.observable(new Date());
    userName = ko.observable("");
    actionResultMessage = ko.observable("");

    //warehouseList = ko.observableArray();
    //unitOfMeasureList = ko.observableArray();

    get lastChangeDescription(): string {
        const userName = this.userName();
        if (userName) {
            const lastChangeDate = DateFunctions.formatDateTime(this.lastChangeDate());
            return `Last changed by: ${userName} - ${lastChangeDate}`;
        } else {
            return "";
        }
    }

    public new() {
        this.isNewOrder = true;

        ControlHelper.lbPrompt("Enter Order Number", (isOk: boolean, orderNumber: string) => {
            if (isOk) {
                this.resetFields();
                this.orderNumber(orderNumber);
                this.save();
            }
        }, 'Add Order');
    }

    public edit(data:KoOrder) {
        this.orderId(data.orderId());
        this.warehouseId(data.warehouseId());
        this.orderNumber(data.orderNumber());
        this.customerName(data.customerName());
        this.customerAddress(data.customerAddress());
        this.destination(data.destination());
        this.volume(data.volume());
        this.unitOfMeasureId(data.unitOfMeasureId());
        this.weightKg(data.weightKg());
        this.pickupDate(data.pickupDate());
        this.deliveryDate(data.deliveryDate());
        this.isDangerousGoods(data.isDangerousGoods());
        this.isCustomerPickup(data.isCustomerPickup());
        this.notes(data.notes());
        this.lastChangeDate(data.lastChangeDate());
        this.userName(data.userName());
        this.actionResultMessage("");

        $("#koModalOrderEdit").modal("show");
    }
    
    private resetFields() {
        this.orderId(0);
        this.warehouseId(0);
        this.orderNumber("");
        this.customerName("");
        this.customerAddress("");
        this.destination("");
        this.volume(0);
        this.unitOfMeasureId(0);
        this.weightKg(0);
        this.pickupDate(new Date());
        this.deliveryDate(new Date());
        this.isDangerousGoods(false);
        this.isCustomerPickup(false);
        this.notes("");
        this.lastChangeDate(new Date());
        this.userName("");
        this.actionResultMessage("");
    }

    public save = () => {
        this.shared.ajax.post("/Orders/SaveOrder", (dataResult: any) => {
            ko.mapping.fromJSON(dataResult, {}, this);

            var message = this.actionResultMessage();
            var isSaved = message.indexOf("has been saved") >= 0;

            if (!isSaved) {
                alert(message);
            } else {
                if (this.isNewOrder) {
                    $("#koModalOrderEdit").modal("show");
                    this.isNewOrder = false;
                } else {
                    $("#koModalOrderEdit").modal("hide");
                }
            }
        }, ko.toJSON(this));
    }

    constructor(sharedModel: SharedModel) {
        this.shared = sharedModel;

        ko.applyBindings(this, $("#koModalOrderEdit")[0]);
    }
}
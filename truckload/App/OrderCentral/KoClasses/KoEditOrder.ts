import { AjaxHelper } from "../../Shared/Classes/AjaxHelper"
import { DateFunctions } from "../../Shared/DateFunctions"
import { SharedModel } from "../Models/SharedModel"
import * as ko from 'knockout';

export class KoEditOrder {
    private sharedModel: SharedModel;

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

    warehouseList = ko.observableArray();
    unitOfMeasureList = ko.observableArray();

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
        alert("new new");
    }

    load(orderId: number) {
        if (orderId) {
            var dataToSend = JSON.parse("{ \"orderId\" : " + orderId + "}");

            this.sharedModel.ajax.get("/Orders/GetOrder", (data: any) => {
                ko.mapping.fromJSON(data, {}, this);
                $("#koModalOrderDetailEdit").modal("show");
            }, dataToSend);
        }
    }

    public save = () => {
        this.sharedModel.ajax.post("/Orders/SaveOrder", (dataResult: any) => {
            ko.mapping.fromJSON(dataResult, {}, this);

            var message = this.actionResultMessage();
            var isSaved = message.indexOf("has been saved") >= 0;

            if (!isSaved) {
                alert(message);
            } else {
                $("#koModalOrderDetailEdit").modal("hide");
            }
        }, ko.toJSON(this));
    }


    constructor(sharedModel: SharedModel) {
        this.sharedModel = sharedModel;
    }
}
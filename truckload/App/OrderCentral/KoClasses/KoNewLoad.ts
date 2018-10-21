import * as ko from 'knockout';
//import { KoOrder } from "./KoOrder"
//import { DateFunctions } from "../../Shared/DateFunctions"
import { SharedModel } from "../Models/SharedModel"
import { KoLoad } from "./KoLoad"
//import KoLoad = require("App/OrderCentral/KoClasses/KoLoad");

export class KoNewLoad {
    //dayNumber: number;
    loadDate: Date;
    newLoadModalName:string;
    //loadDateText = ko.observable("");
    truckId = ko.observable(0);
    trailerId = ko.observable(0);
    driverId = ko.observable(0);

    shared: SharedModel;

    actionResultMessage = ko.observable("");

    public createLoad = () => {
        $(this.newLoadModalName).modal("show");
    }

    public save = () => {
        var dataToSend = JSON.stringify({ loadDate: this.loadDate, truckId: this.truckId(), trailerId: this.trailerId(), driverId: this.driverId() });

        this.shared.ajax.post("/Loads/CreateNewLoad",
            (dataResult: any) => {
                var resultObject = new KoLoad();
                ko.mapping.fromJSON(dataResult, {}, resultObject);

                var message = resultObject.actionResultMessage();
                var isSaved = message.indexOf("has been saved") >= 0;

                if (!isSaved) {
                    alert(message);
                } else {
                    $(this.newLoadModalName).modal("hide");
                    this.resetOptions();
                }

            },
            dataToSend);
    }

    public cancel = () => {
        this.resetOptions();
    }

    private resetOptions() {
        // ReSharper disable once ExpressionIsAlwaysConst
        this.truckId((null) as any);
        // ReSharper disable once ExpressionIsAlwaysConst
        this.driverId((null) as any);
        // ReSharper disable once ExpressionIsAlwaysConst
        this.trailerId((null) as any);
    }

    constructor(sharedModel: SharedModel, loadDate:Date, dayNumber:number) {
        this.loadDate = loadDate;
        this.newLoadModalName = "#koModalCreateLoad_" + dayNumber;
        this.shared = sharedModel;
    }
}
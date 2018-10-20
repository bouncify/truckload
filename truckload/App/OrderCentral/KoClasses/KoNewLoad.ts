import * as ko from 'knockout';
//import { KoOrder } from "./KoOrder"
//import { DateFunctions } from "../../Shared/DateFunctions"
import { SharedModel } from "../Models/SharedModel"

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
        //alert("create load click! " + this.loadDate());
        //this.startDay(moment(this.startDay()).add(1, "day").toDate());
        $(this.newLoadModalName).modal("show");
    }

    public save() {
        alert("save new load!");
    }

    public cancel() {
        alert("cancel new load!");
    }

    constructor(sharedModel: SharedModel, loadDate:Date, dayNumber:number) {
        this.loadDate = loadDate;
        this.newLoadModalName = "#koModalCreateLoad_" + dayNumber;
        this.shared = sharedModel;
    }
}
import * as ko from 'knockout';
import { DateFunctions } from "../../Shared/DateFunctions"
import { LoadStatus, AccessLevels } from "../../Shared/Global"
import { SharedModel } from "../Models/SharedModel"
import { KoLoad } from "./KoLoad"
import { StringFunctions } from "../../Shared/StringFunctions"
import { Functions } from "../../Shared/Functions"

import * as moment from 'moment';
import Global = require("App/Shared/Global");
import Globals = Global.Globals;

export class KoLoadCol {
    private sharedModel: SharedModel;

    private loads = ko.observableArray([] as KoLoad[]);
    partialLoadsCount = ko.observable(0);
    fullLoadsCount = ko.observable(0);

    dayNumber:number;
    loadDate = ko.observable(new Date());
    isLastDay:boolean; 
    textDate = ko.observable("");

    loadGridName = "";

    public createLoad() {
        alert("create load click! " + this.dayNumber);
        //this.startDay(moment(this.startDay()).add(1, "day").toDate());
    }

    private updateLoadTotal() {
        var totalLoads = this.loads().length;
        var totalUnlocked = 0;
        ko.utils.arrayForEach(this.loads(), load => {
            totalUnlocked += (load.loadStatusId() === LoadStatus.Unlocked ? 1 : 0);
        });

        this.partialLoadsCount(totalUnlocked);
        this.fullLoadsCount(totalLoads - totalUnlocked);
    }

    public loadAll() {
        this.sharedModel.setWaitSpinner(true,this.loadGridName);
        var dataToSend = JSON.parse("{ \"loadDate\" : " + JSON.stringify(this.loadDate()) + "}");

        this.sharedModel.ajax.get("/Loads/GetLoadsByDate", (data: any) => {
            ko.mapping.fromJSON(data, {}, this.loads);

            this.updateLoadTotal();
            $.each(this.loads(), (index, load) => {
                this.populateExtraFields(load);
            });

            this.sharedModel.setWaitSpinner(false, this.loadGridName);
        }, dataToSend);
    }

    private populateExtraFields(load: KoLoad) {
        const changeDetail = StringFunctions.getInitialsFromName(load.userName()) + " - " + DateFunctions.formatDateTime(load.lastChangeDate());
        load.loadDay = this.dayNumber;
        load.lastChangeDetail = changeDetail;
        load.maxLoadWeightLbs = Functions.kToLbs(load.loadCapacityKg());
        if (load.truckId() === null) load.truckDescription = ko.observable("UNKNOWN");
        if (load.trailerId() === null) load.trailerDescription = ko.observable("UNKNOWN");
        if (load.driverId() === null) load.driverName = ko.observable("UNKNOWN");
        if (load.unitOfMeasureId() === null) load.unitTypeDescription = ko.observable("UNKNOWN");

        load.isDeletable = ko.observable(load.loadStatusId() !== LoadStatus.Dispatched && this.sharedModel.accessLevel > AccessLevels.Entry);
        load.isEditable = ko.observable(load.loadStatusId() === LoadStatus.Unlocked && this.sharedModel.accessLevel > AccessLevels.Entry);

        load.statusImagePath = this.sharedModel.baseUrl + "/App/Content/Images/";
        switch (load.loadStatusId()) {
            case LoadStatus.Unlocked:
                load.statusImagePath += "lock_open.png";
                load.statusCaption = "Unlocked";
                load.onDropFunction = "OrderCentral.dropOrder(event)";
                load.onDragOverFunction = "OrderCentral.allowDropOrder(event)";
                break;
            case LoadStatus.Locked:
                load.statusImagePath += "lock_closed.png";
                load.statusCaption = "Locked";
                load.onDropFunction = "";
                load.onDragOverFunction = "";
                break;
            case LoadStatus.Dispatched:
                load.statusImagePath += "dispatched.png";
                load.statusCaption = "Dispatched";
                load.onDropFunction = "";
                load.onDragOverFunction = "";
                break;
        }

        var loadColor = "#d7d6d6";//default
        var red = "#ff5252";
        var lightRed = "#ffcece";
        var purple = "#f188fd";
        var lightPurple = "#f8e1ff";
        var orderColor = "#fff";

        if (load.unitCapacity() < load.currentUnitCount()) {
            loadColor = purple;
            orderColor = lightPurple;
        }
        if (load.loadCapacityKg() < load.currentLoadWeightKg()) {
            loadColor = red;
            orderColor = lightRed;
        }

        load.loadColor = loadColor;
        load.orderColor = orderColor;
    }

    public initDay(startDate:Date) {
        //this.dayNumber = dayNum;
        this.loadDate(moment(startDate).add(this.dayNumber - 1, "day").toDate());
        this.textDate(DateFunctions.formatLoadDate(this.loadDate()));
    }

    constructor(sharedModel: SharedModel, startDate: Date, dayNum: number) {
        this.sharedModel = sharedModel;
        this.loadGridName = sharedModel.loadGridName + dayNum;
        this.isLastDay = sharedModel.visibleLoadCols === dayNum;
        this.dayNumber = dayNum;
        this.initDay(startDate);
        this.loadAll();
        //this.loadDate(moment(sharedModel.loadCol1Date).add(dayNum-1, "day").toDate());
        //this.textDate = DateFunctions.formatLoadDate(this.loadDate());

    }
}
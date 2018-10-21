import * as ko from 'knockout';
import { DateFunctions } from "../../Shared/DateFunctions"
import { LoadStatus, AccessLevels,DbOperation,CrudMessage } from "../../Shared/Global"
import { SharedModel } from "../Models/SharedModel"
import { KoLoad } from "./KoLoad"
import { KoNewLoad } from "./KoNewLoad"
import { StringFunctions } from "../../Shared/StringFunctions"
import { Functions } from "../../Shared/Functions"
import { ControlHelper } from "../../Shared/ControlHelper"

import * as moment from 'moment';
import Global = require("App/Shared/Global");
import Globals = Global.Globals;

export class KoLoadCol {
    private shared: SharedModel;

    private newLoad:KoNewLoad;
    private loads = ko.observableArray([] as KoLoad[]);
    partialLoadsCount = ko.observable(0);
    fullLoadsCount = ko.observable(0);

    dayNumber:number;
    loadDate = ko.observable(new Date());
    isLastDay:boolean; 
    textDate = ko.observable("");

    loadGridName = "";

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
        this.shared.setWaitSpinner(true,this.loadGridName);
        var dataToSend = JSON.parse("{ \"loadDate\" : " + JSON.stringify(this.loadDate()) + "}");

        this.shared.ajax.get("/Loads/GetLoadsByDate", (data: any) => {
            ko.mapping.fromJSON(data, {}, this.loads);

            this.updateLoadTotal();
            $.each(this.loads(), (index, load) => {
                this.populateExtraFields(load);
            });

            this.shared.setWaitSpinner(false, this.loadGridName);
        }, dataToSend);
    }

    public deleteLoad(loadId: number) {
        var dataToSend = JSON.stringify({ loadId: loadId });

        ControlHelper.lbConfirm("Are you sure you want to delete this load?", (result: boolean) => {
            if (result) {
                //this.setWaitSpinner(true, this.gridName);
                this.shared.ajax.post("/Loads/DeleteLoad",
                    (dataResult: any) => {
                        var resultObject = new KoLoad();
                        ko.mapping.fromJSON(dataResult, {}, resultObject);
                        var message = resultObject.actionResultMessage();
                        var isDeleted = message.indexOf("has been deleted") >= 0;

                        if (!isDeleted) {
                            alert(message);
                        }
                    }, dataToSend);
            }
        });
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

        load.isDeletable = ko.observable(load.loadStatusId() !== LoadStatus.Dispatched && this.shared.accessLevel > AccessLevels.Entry);
        load.isEditable = ko.observable(load.loadStatusId() === LoadStatus.Unlocked && this.shared.accessLevel > AccessLevels.Entry);

        load.statusImagePath = this.shared.baseUrl + "/App/Content/Images/";
        switch (load.loadStatusId()) {
            case LoadStatus.Unlocked:
                load.statusImagePath += "lock_open.png";
                load.statusCaption = "Unlocked";
                load.onDropFunction = "app.main.dropOrder(event)";
                load.onDragOverFunction = "app.main.allowDropOrder(event)";
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

    public receiveRefreshNotification(message: CrudMessage) {
        var dataToSend = JSON.parse("{ \"loadId\" : " + message.id + "}");

        switch (message.operation) {
        case DbOperation.Create:
            this.shared.ajax.get("/Loads/GetLoad", (data: any) => {
                var newLoad = ko.mapping.fromJSON(data);
                this.populateExtraFields(newLoad);
                this.loads.push(newLoad);
                this.updateLoadTotal();
                //this.setWaitSpinner(false, this.gridName);
            }, dataToSend);
            break;
        case DbOperation.Read:
            break;
        case DbOperation.Update:
            this.shared.ajax.get("/Loads/GetLoad", (data: any) => {
                var updateLoad = ko.mapping.fromJSON(data);
                this.populateExtraFields(updateLoad);
                var oldLoad = ko.utils.arrayFirst(this.loads(), item => item.loadId() === message.id);
                if (oldLoad) {
                    this.loads.replace(oldLoad, updateLoad);
                } else {// its new or been moved
                    this.loads.push(updateLoad);
                }
                this.updateLoadTotal();
                //this.setWaitSpinner(false, this.gridName);
            }, dataToSend);
            break;
        case DbOperation.Delete:
            var load = ko.utils.arrayFirst(this.loads(), item => item.loadId() === message.id);
            if (load) this.loads.remove((x: any) => x.loadId === load.loadId);
            this.updateLoadTotal();
            //this.setWaitSpinner(false, this.gridName);
            break;
        }
    }

    public initDay(startDate:Date) {
        this.loadDate(moment(startDate).add(this.dayNumber - 1, "day").toDate());
        this.textDate(DateFunctions.formatLoadDate(this.loadDate()));
    }

    constructor(sharedModel: SharedModel, startDate: Date, dayNum: number) {
        this.shared = sharedModel;
        this.loadGridName = sharedModel.loadGridName + dayNum;
        this.isLastDay = sharedModel.visibleLoadCols === dayNum;
        this.dayNumber = dayNum;
        this.initDay(startDate);
        this.newLoad = new KoNewLoad(sharedModel, this.loadDate(), this.dayNumber);
        this.loadAll();
        //this.loadDate(moment(sharedModel.loadCol1Date).add(dayNum-1, "day").toDate());
        //this.textDate = DateFunctions.formatLoadDate(this.loadDate());

    }
}
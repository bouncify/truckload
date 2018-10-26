import { AjaxHelper } from "../../Shared/Classes/AjaxHelper"
import { DateFunctions } from "../../Shared/DateFunctions"
import { SharedModel } from "../Models/SharedModel"
import { LoadStatus, AccessLevels, DbOperation, CrudMessage } from "../../Shared/Global"
import * as ko from 'knockout';

import { ControlHelper } from "../../Shared/ControlHelper"
import { KoOrder } from "./KoOrder"
import { KoLoad } from "./KoLoad"
import * as moment from 'moment';
import "jqueryui/jquery-ui.js"

export class KoEditLoad {
    private shared: SharedModel;

    oldLoadDate: Date = new Date();
    loadDate = ko.observable(new Date());
    loadDateText = ko.observable("");

    loadId = ko.observable(0);
    isEditable = ko.observable(false);
    isChangeStatusAllowed = ko.observable(false);

    truckId = ko.observable(0);
    trailerId = ko.observable(0);
    driverId = ko.observable(0);
    loadStatusId = ko.observable(0);
    currentStatusId = 0;
    editLoadModalName = "#koModalEditLoad";

    ordersList = ko.observableArray([] as KoOrder[]);

    actionResultMessage = ko.observable("");
    refreshLoad: Function;

    public save = () => {
        if (this.shared.accessLevel > AccessLevels.Entry && this.currentStatusId !== LoadStatus.Dispatched) {
            //var listOrders = $("#sortableList li");

            var newOrderSequence: number[] = [];

            //listOrders.each((idx, li) => {
            //    var line = $(li)[0].childNodes[1];
            //    newOrderSequence.push(Number((line as any).children[0].innerHTML));
            //});

            var isChangeDate = "" + moment(this.oldLoadDate).startOf("day") !==
                "" + moment(this.loadDate()).startOf("day");

            var dataToSend = JSON.stringify({
                loadId: this.loadId(),
                loadDate: this.loadDate(),
                truckId: this.truckId(),
                trailerId: this.trailerId(),
                driverId: this.driverId(),
                loadStatusId: this.loadStatusId(),
                newOrderSequence: newOrderSequence
            });

            this.shared.ajax.post("/Loads/SaveEditedLoad",
                (dataResult: any) => {
                    var resultObject = new KoLoad();
                    ko.mapping.fromJSON(dataResult, {}, resultObject);

                    var message = resultObject.actionResultMessage();
                    var isSaved = message.indexOf("has been saved") >= 0;

                    if (!isSaved) {
                        alert(message);
                    } else {
                        if (isChangeDate) {
                            this.refreshLoad(new CrudMessage(this.loadId(), DbOperation.Delete, this.oldLoadDate, true));
                        }
                        $(this.editLoadModalName).modal("hide");
                    }
                },
                dataToSend);
        } else {
            $(this.editLoadModalName).modal("hide");
        }
    }

    public cancel() {
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

    public editLoadClick = (load: KoLoad) => {
        this.loadId(load.loadId());
        this.loadDateText(DateFunctions.formatLoadDate(load.loadDate()));
        this.loadDate(load.loadDate());

        this.truckId(load.truckId());
        this.driverId(load.driverId());
        this.trailerId(load.trailerId());
        this.currentStatusId = load.loadStatusId();
        this.loadStatusId(load.loadStatusId());
        this.oldLoadDate = load.loadDate();

        this.isChangeStatusAllowed(this.loadStatusId() !== LoadStatus.Dispatched && this.shared.accessLevel > AccessLevels.Entry);
        this.isEditable(this.loadStatusId() === LoadStatus.Unlocked && this.shared.accessLevel > AccessLevels.Entry);

        $("#sortableList").sortable("option", "disabled", !this.isEditable());
        
        var orders = ko.mapping.toJSON(load.ordersList());

        this.ordersList.removeAll();
        ko.mapping.fromJSON(orders, {}, this.ordersList);

        $(this.editLoadModalName).modal("show");
    };

    constructor(sharedModel: SharedModel, refreshLoad: Function) {
        //this.loadDate(loadDate);
        this.shared = sharedModel;
        //this.editLoadModalName = "#koModalEditLoad_" + loadDayNumber;
        this.refreshLoad = refreshLoad;

        ko.applyBindings(this, $(this.editLoadModalName)[0]);
    }
}

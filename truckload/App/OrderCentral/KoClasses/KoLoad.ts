import * as ko from 'knockout';
import { KoOrder } from "./KoOrder"
//import { DateFunctions } from "../../Shared/DateFunctions"
//import { SharedModel } from "../Models/SharedModel"

export class KoLoad {
    loadId = ko.observable(0);
    loadDate = ko.observable(new Date());

    loadCapacityKg = ko.observable(0);
    currentLoadWeightKg = ko.observable(0);

    unitOfMeasureId = ko.observable(0);
    unitTypeDescription = ko.observable("");

    currentUnitCount = ko.observable(0);
    unitCapacity = ko.observable(0);

    truckId = ko.observable(0);
    truckDescription = ko.observable("");

    trailerId = ko.observable(0);
    trailerDescription = ko.observable("");

    driverId = ko.observable(0);
    driverName = ko.observable("");

    loadStatusId = ko.observable(0);
    postalCodeGroupId = ko.observable(0);
    lastChangeDate = ko.observable(new Date());
    userName = ko.observable("");
    ordersList = ko.observableArray([] as KoOrder[]);

    actionResultMessage = ko.observable("");

    //extra fields
    loadDay = 0;
    lastChangeDetail = "";
    maxLoadWeightLbs = 0;
    loadColor = "";
    orderColor = "";
    statusImagePath = "";
    statusCaption = "";
    onDropFunction = "";
    onDragOverFunction = "";
    isDeletable = ko.observable(false);
    isEditable = ko.observable(false);

}
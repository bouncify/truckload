import { AjaxHelper } from "../../Shared/Classes/AjaxHelper"
import * as ko from 'knockout';

export class KoDropDownData {
    truckList = ko.observableArray();
    trailerList = ko.observableArray();
    driverList = ko.observableArray();
    loadStatusList = ko.observableArray();
    unitsOfMeasureList = ko.observableArray();
    warehouseList = ko.observableArray();

    constructor(ajax: AjaxHelper) {
        ajax.get("/OrderCentral/GetDropDownData", (data: any) => {
            ko.mapping.fromJSON(data, {}, this);
        }, undefined);
    }
}
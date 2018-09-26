import { AjaxHelper } from "../../Shared/Classes/AjaxHelper"
import * as ko from 'knockout';

export class KoDropDownData {
    truckList = ko.observableArray();
    trailerList = ko.observableArray();
    driverList = ko.observableArray();
    loadStatusList = ko.observableArray();

    private ajaxHelper = new AjaxHelper();

    constructor() {
        this.ajaxHelper.get("/Load/GetDropDownData", (data: any) => {
            ko.mapping.fromJSON(data, {}, this);
        }, undefined);
    }
}
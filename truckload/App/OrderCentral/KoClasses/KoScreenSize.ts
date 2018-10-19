import { AjaxHelper } from "../../Shared/Classes/AjaxHelper"
import { DateFunctions } from "../../Shared/DateFunctions"
import { SharedModel } from "../Models/SharedModel"
import * as ko from 'knockout';

import { ControlHelper } from "../../Shared/ControlHelper"
import { KoOrder } from "./KoOrder"

export class KoScreenSize {
    public shared: SharedModel;

    ordersPageSize = ko.observable(0);
    visibleLoadCols = ko.observable(0);

    actionResultMessage = ko.observable("");

    public edit() {
        this.ordersPageSize(this.shared.ordersPageSize);
        this.visibleLoadCols(this.shared.visibleLoadCols);
        $("#koModalScreenSizeEdit").modal("show");
    }


    public save = () => {
        this.shared.ajax.post("/OrderCentral/SaveScreenSize", (dataResult: any) => {
            ko.mapping.fromJSON(dataResult, {}, this);

            var message = this.actionResultMessage();
            var isSaved = message.indexOf("has been saved") >= 0;

            if (!isSaved) {
                alert(message);
            } else {
                window.location.href = window.location.href;
            }
        }, ko.toJSON(this));
    }

    constructor(sharedModel: SharedModel) {
        this.shared = sharedModel;
        this.ordersPageSize(sharedModel.ordersPageSize);
        this.visibleLoadCols(sharedModel.visibleLoadCols);

        ko.applyBindings(this, $("#koModalScreenSizeEdit")[0]);
    }
}
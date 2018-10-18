//import { KoOrder } from "../KoClasses/KoOrder"
import { KoLoadCol } from "../KoClasses/KoLoadCol"
//import { KoEditOrder } from "../KoClasses/KoEditOrder"
//import { OrderMessageService } from "../Classes/OrderMessageService"
//import { DbOperation,CrudMessage } from "../../Shared/Global"

import { SharedModel } from "./SharedModel"
//import { StringFunctions } from "../../Shared/StringFunctions"
//import { DateFunctions } from "../../Shared/DateFunctions"
//import { ControlHelper } from "../../Shared/ControlHelper"

import * as moment from 'moment';
import * as ko from 'knockout';

export class LoadModel {
    //private setWaitSpinner: Function;
    //private orderGridName: string;
    private sharedModel: SharedModel;
    private loadCols = ko.observableArray([] as KoLoadCol[]);

    private totalLoadCols = 0;
    //private editOrder: KoEditOrder;
    //private orderService: OrderMessageService;


    //private populateDates() {
    //    this.loadCols.push(new KoLoadCol(this.sharedModel.loadCol1Date,1));
    //    var totalLoadCols = this.sharedModel.visibleLoadCols;

    //    for (let i = 1; i < totalLoadCols; i++) {
    //        var newLoadCol = new KoLoadCol(moment(this.sharedModel.loadCol1Date).add(i, "day").toDate(),i+1);

    //        if (i === totalLoadCols - 1) newLoadCol.isLastDay = true;
    //        this.loadCols.push(newLoadCol);
    //    }
    //}


    constructor(sharedModel: SharedModel) {
        this.sharedModel = sharedModel;

        this.totalLoadCols = this.sharedModel.visibleLoadCols;
        for (let i = 1; i < this.totalLoadCols +1; i++) {
            this.loadCols.push(new KoLoadCol(sharedModel,i));
        }

        //this.populateDates();
        //this.orderService = new OrderMessageService(this.receiveDbUpdateOrderNotification);
    }
}
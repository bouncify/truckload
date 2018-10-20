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
    private shared: SharedModel;
    public loadCols = ko.observableArray([] as KoLoadCol[]);
    day1Date = ko.observable(new Date());

    private totalLoadCols:number;
    //private editOrder: KoEditOrder;
    //private orderService: OrderMessageService;

    public nextDay = () => {
        this.day1Date(moment(this.day1Date()).add(1, "day").toDate());
        this.refreshLoads();
    }

    public previousDay = () => {
        this.day1Date(moment(this.day1Date()).add(-1, "day").toDate());
        this.refreshLoads();
    }

    private refreshLoads() {
        ko.utils.arrayForEach(this.loadCols(), loadCol => {
            loadCol.loadAll();
        });
    }

    constructor(sharedModel: SharedModel) {
        this.shared = sharedModel;

        this.totalLoadCols = this.shared.visibleLoadCols;
        for (let i = 1; i < this.totalLoadCols +1; i++) {
            this.loadCols.push(new KoLoadCol(sharedModel,this.day1Date(),i));
        }
        
        this.day1Date.subscribe(() => {

            ko.utils.arrayForEach(this.loadCols(), col => {
                col.initDay(this.day1Date());
            });
        });

        //this.orderService = new OrderMessageService(this.receiveDbUpdateOrderNotification);
    }
}
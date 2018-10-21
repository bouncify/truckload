import { KoLoadCol } from "../KoClasses/KoLoadCol"
import { KoOrder } from "../KoClasses/KoOrder"
//import { LoadMessageService } from "../Classes/LoadMessageService"
import { CrudMessage } from "../../Shared/Global"
import { DateFunctions } from "../../Shared/DateFunctions"

import { SharedModel } from "./SharedModel"

import * as moment from 'moment';
import * as ko from 'knockout';

export class LoadModel {
    private shared: SharedModel;
//    private loadService: LoadMessageService;
    public loadCols = ko.observableArray([] as KoLoadCol[]);
    day1Date = ko.observable(new Date());

    private totalLoadCols: number;


    private editOrderFunction: Function;
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

    public receiveDbUpdateLoadNotification = (message: CrudMessage) => {
        ko.utils.arrayForEach(this.loadCols(), loadCol => {
            if (DateFunctions.isDateEqual(loadCol.loadDate(), message.theDate)) {
                loadCol.receiveRefreshNotification(message);
            }
        });
    }

    public editOrder(data: KoOrder) {
        this.editOrderFunction(data);
    }

    constructor(sharedModel: SharedModel, editOrderFunction: Function) {
        this.shared = sharedModel;
        this.editOrderFunction = editOrderFunction;

        this.totalLoadCols = this.shared.visibleLoadCols;
        for (let i = 1; i < this.totalLoadCols +1; i++) {
            this.loadCols.push(new KoLoadCol(sharedModel,this.day1Date(),i));
        }
        
        this.day1Date.subscribe(() => {

            ko.utils.arrayForEach(this.loadCols(), col => {
                col.initDay(this.day1Date());
            });
        });

        //this.loadService = new LoadMessageService(this.receiveDbUpdateLoadNotification);
    }
}
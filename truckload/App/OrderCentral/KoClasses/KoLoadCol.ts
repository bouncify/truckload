import * as ko from 'knockout';
import { DateFunctions } from "../../Shared/DateFunctions"
import { LoadStatus } from "../../Shared/Global"
import { SharedModel } from "../Models/SharedModel"
import { KoLoad } from "./KoLoad"

import * as moment from 'moment';

export class KoLoadCol {
    private sharedModel: SharedModel;

    private loads = ko.observableArray([] as KoLoad[]);
    partialLoadsCount = ko.observable(0);
    fullLoadsCount = ko.observable(0);

    dayNumber:number;
    loadDate = ko.observable(new Date());
    isLastDay:boolean; 
    textDate = ko.observable("");



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
    
    public initDay(startDate:Date) {
        //this.dayNumber = dayNum;
        this.loadDate(moment(startDate).add(this.dayNumber - 1, "day").toDate());
        this.textDate(DateFunctions.formatLoadDate(this.loadDate()));
    }

    constructor(sharedModel: SharedModel, startDate: Date, dayNum: number) {
        this.sharedModel = sharedModel;
        this.isLastDay = sharedModel.visibleLoadCols === dayNum;
        this.dayNumber = dayNum;
        this.initDay(startDate);
        //this.loadDate(moment(sharedModel.loadCol1Date).add(dayNum-1, "day").toDate());
        //this.textDate = DateFunctions.formatLoadDate(this.loadDate());

    }
}
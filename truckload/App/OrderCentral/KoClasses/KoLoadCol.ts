import * as ko from 'knockout';
import { DateFunctions } from "../../Shared/DateFunctions"
import { SharedModel } from "../Models/SharedModel"

import * as moment from 'moment';

export class KoLoadCol {
    private sharedModel: SharedModel;

    dayNumber:number=0;
    loadDate = ko.observable(new Date());
    isLastDay = false; 
    textDate = ko.observable("");

    public createLoad() {
        alert("create load click! " + this.dayNumber);
        //this.startDay(moment(this.startDay()).add(1, "day").toDate());
    }


//theDate: Date, dayNum: number
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
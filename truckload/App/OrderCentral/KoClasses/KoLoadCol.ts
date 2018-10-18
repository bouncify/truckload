import * as ko from 'knockout';
import { DateFunctions } from "../../Shared/DateFunctions"
import { SharedModel } from "../Models/SharedModel"

import * as moment from 'moment';

export class KoLoadCol {
    dayNumber:number=0;
    loadDate = ko.observable(new Date());
    isLastDay = false; 
    textDate = "";

    public createLoad() {
        alert("create load click! " + this.dayNumber);
        //this.startDay(moment(this.startDay()).add(1, "day").toDate());
    }

    public nextDay() {
        alert("next day click!");
        //this.startDay(moment(this.startDay()).add(1, "day").toDate());
    }

    public previousDay() {
        alert("prev day click!");

        //this.startDay(moment(this.startDay()).subtract(1, "day").toDate());
    }

    public setDay(theDate: Date, dayNum: number) {
        this.dayNumber = dayNum;
        this.loadDate(theDate);
        this.textDate = DateFunctions.formatLoadDate(theDate);
    }

    constructor(sharedModel: SharedModel, dayNum: number) {
        this.isLastDay = sharedModel.visibleLoadCols === dayNum;
        this.dayNumber = dayNum;
        this.loadDate(moment(sharedModel.loadCol1Date).add(dayNum-1, "day").toDate());
        this.textDate = DateFunctions.formatLoadDate(this.loadDate());

        this.loadDate.subscribe(() => {
            alert("date changed! to"+this.loadDate());
        });
    }
}
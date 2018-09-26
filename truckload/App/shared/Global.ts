

export module Globals {
    export var dateFormat = "MM/DD/YYYY";
    export var orderGridName = "#koOrderGrid";
    export var load1GridName = "#koLoadsDay1";
    export var load2GridName = "#koLoadsDay2";
    export var load3GridName = "#koLoadsDay3";
    export var gridHeight = 680;
}

export enum DbOperation {
    Create = 1,
    Read = 2,
    Update = 3,
    Delete = 4
}

export class CrudMessage {
    id: number;
    operation: DbOperation;
    theDate: Date;
    constructor(id: number, operation: DbOperation, theDate: Date = new Date()) {
        this.id = id;
        this.operation = operation;
        this.theDate = theDate;
    }
}
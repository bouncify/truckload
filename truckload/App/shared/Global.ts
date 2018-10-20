

export module Globals {
    export var dateFormat = "MM/DD/YYYY";

}

export enum DbOperation {
    Create = 1,
    Read = 2,
    Update = 3,
    Delete = 4
}

export enum LoadStatus {
    Unlocked = 1,
    Locked = 2,
    Dispatched = 4
}

export enum AccessLevels {
    None = 0,
    Entry = 1,
    Dispatcher = 2
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
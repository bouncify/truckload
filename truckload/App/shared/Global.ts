

export module Globals {
    export var dateFormat = "MM/DD/YYYY";
    export var baseUrl: string;

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
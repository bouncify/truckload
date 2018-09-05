"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Globals;
(function (Globals) {
    Globals.dateFormat = "MM/DD/YYYY";
})(Globals = exports.Globals || (exports.Globals = {}));
var DbOperation;
(function (DbOperation) {
    DbOperation[DbOperation["Create"] = 1] = "Create";
    DbOperation[DbOperation["Read"] = 2] = "Read";
    DbOperation[DbOperation["Update"] = 3] = "Update";
    DbOperation[DbOperation["Delete"] = 4] = "Delete";
})(DbOperation = exports.DbOperation || (exports.DbOperation = {}));
var CrudMessage = /** @class */ (function () {
    function CrudMessage(id, operation, theDate) {
        if (theDate === void 0) { theDate = new Date(); }
        this.id = id;
        this.operation = operation;
        this.theDate = theDate;
    }
    return CrudMessage;
}());
exports.CrudMessage = CrudMessage;
//# sourceMappingURL=Global.js.map
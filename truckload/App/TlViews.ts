
import "kendo/js/kendo.menu.js"
import "kendo/js/kendo.grid.js"
import "kendo/js/kendo.aspnetmvc.js"
import { ControlHelper } from "./Shared/ControlHelper"

$("#menu").kendoMenu();
 

export var onDataSourceError = ControlHelper.gridErrorHandler;
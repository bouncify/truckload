import "kendo/js/kendo.grid.js"
import "kendo/js/kendo.dialog.js"
import "kendo/js/kendo.aspnetmvc.js"

import "kendo/js/kendo.menu.js"
import {Driver} from "./Modules/Driver"
import {CrudScreenAutoSave} from "../Shared/Classes/CrudScreenAutoSave"


$("#menu").kendoMenu();

export var module: CrudScreenAutoSave;

export function initDriverModule() {
    module = Driver.init();
}


import "kendo/js/kendo.grid.js"
//import "kendo/js/kendo.datepicker.js"
import "kendo/js/kendo.dialog.js"
import "kendo/js/kendo.aspnetmvc.js"

import "kendo/js/kendo.menu.js"
import {Driver} from "./Modules/Driver"
import {Truck} from "./Modules/Truck"
import {UserLogin} from "./Modules/UserLogin"
import {CrudScreenAutoSave} from "../Shared/Classes/CrudScreenAutoSave"


$("#menu").kendoMenu();

export var module: CrudScreenAutoSave;

export function initDriverModule() {
    module = Driver.init();
}

export function initTruckModule() {
    module = Truck.init();
}

export function initUserLoginModule() {
    module = UserLogin.init();
}
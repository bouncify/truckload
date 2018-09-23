import "kendo/js/kendo.grid.js"
import "kendo/js/kendo.dialog.js"
import "kendo/js/kendo.aspnetmvc.js"


import { Driver } from "./Modules/Driver"
import { Truck } from "./Modules/Truck"
import { Trailer } from "./Modules/Trailer"
import { UserLogin } from "./Modules/UserLogin"
import { Warehouse } from "./Modules/Warehouse"
import { CrudScreenAutoSave } from "../Shared/Classes/CrudScreenAutoSave"



export var module: CrudScreenAutoSave;

export function initDriverModule() { module = Driver.init(); }

export function initTruckModule() { module = Truck.init(); }

export function initTrailerModule() { module = Trailer.init(); }

export function initUserLoginModule() { module = UserLogin.init(); }

export function initWarehouseModule() { module = Warehouse.init(); }
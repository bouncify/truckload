
import "kendo/js/kendo.grid.js"
import "kendo/js/kendo.dialog.js"
import "kendo/js/kendo.aspnetmvc.js"
import { Globals } from "../Shared/Global"
//import * as ko from 'knockout';
import "knockout-mapping"
import 'knockout-kendo/build/knockout-kendo';

import { Main } from "./Classes/Main"
import { Startup } from "./Modules/Startup"



$("#containerBody").css("width",Globals.bodyWidth);

export var module: Main;

export function initMainModule() { module = Startup.init()}


//export var module: CrudScreenAutoSave;

//export function initDriverModule() { module = Driver.init(); }


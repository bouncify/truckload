
import "kendo/js/kendo.grid.js"
import "kendo/js/kendo.dialog.js"
import "kendo/js/kendo.aspnetmvc.js"
import "knockout-mapping"
import 'knockout-kendo/build/knockout-kendo';

import { Main } from "./Classes/Main"


export var module: Main;

export function initMainModule() { module = new Main()}




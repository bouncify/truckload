
import "kendo/js/kendo.grid.js"
import "kendo/js/kendo.dialog.js"
import "kendo/js/kendo.aspnetmvc.js"
import "knockout-mapping"
import "knockout-kendo/build/knockout-kendo";
///// <reference path="../../../node_modules/signalr/jquery.signalr.min.js" />
//var signalR = require('../js/jquery.signalR-2.2.0.js')

import { Main } from "./Classes/Main"
import { Setting } from "./Classes/Setting"
import { AjaxHelper } from "../Shared/Classes/AjaxHelper"

export var main: Main;

export function initMainModule() {
    var ajax = new AjaxHelper;

    ajax.get("/OrderCentral/GetSettings", (data: any) => {
        var settings: Setting[] = JSON.parse(data);
        main = new Main(settings);
    }, undefined);

}


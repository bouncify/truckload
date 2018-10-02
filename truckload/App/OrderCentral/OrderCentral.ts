
import "kendo/js/kendo.grid.js"
import "kendo/js/kendo.dialog.js"
import "kendo/js/kendo.aspnetmvc.js"
import "knockout-mapping"
import 'knockout-kendo/build/knockout-kendo';

import { Main } from "./Classes/Main"
import { Setting } from "./Classes/Setting"
import { AjaxHelper } from "../Shared/Classes/AjaxHelper"

export var module: Main;

export function initMainModule() {
    var ajax = new AjaxHelper;

    ajax.get("/OrderCentral/GetSettings", (data: any) => {
        var settings: Setting[] = JSON.parse(data);
        module = new Main(settings);
    }, undefined);

}
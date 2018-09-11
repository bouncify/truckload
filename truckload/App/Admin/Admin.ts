
import "kendo/js/kendo.grid.js"

import * as ko from 'knockout';
import "knockout-mapping"
import 'knockout-kendo/build/knockout-kendo';


import { SelectListItem } from "../Shared/Classes/SelectListItem"
import { KoUserLoginsModel } from "./Classes/KoUserLoginsModel"
import { AjaxHelper } from "../Shared/Classes/AjaxHelper"

var ajaxHelper = new AjaxHelper();
var accessLevels: SelectListItem[];
var viewModelUserLogins = new KoUserLoginsModel(ajaxHelper);



$(() => {
    $("#menu").kendoMenu();

    $("#koUserLoginsGrid").kendoGrid({
        columns: [
            { field: "userLoginId",title: "x" },
            { title: "x" },
            { title: "x" },
            { title: "x" }
        ],

        height: 550,

    });

    ko.applyBindings(viewModelUserLogins, $("#koUserLoginsGrid")[0]);
});



import "kendo/js/kendo.menu.js"
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

$("#menu").kendoMenu();

ko.bindingHandlers.kendoGrid.options = {
    columns: [
        { field: "userLoginId", title: "Id" },
        { field: "userId", title: "Login Id" },
        { field: "userName", title: "User Name" },
        { field: "email", title: "Email" },
        { field: "accessLevelId", title: "Access Level" }
    ],
    scrollable: true,
    sortable: true,
    height: 550,
};

ko.applyBindings(viewModelUserLogins, $("#koUserLoginsGrid")[0]);

class KoTest {
    items = ko.observableArray([
        { id: "1", name: "apple" },
        { id: "2", name: "orange" },
        { id: "3", name: "banana" }
    ]);

    addItem() {
        var num = this.items().length + 1;
        this.items.push(({ id: num, name: "new" + num }) as any);
    };
}

var viewModel = new KoTest();

ko.bindingHandlers.kendoGrid.options = {
    groupable: true,
    scrollable: true,
    sortable: true,
    pageable: { pageSize: 10 }
};


ko.applyBindings(viewModel, $("#koTestGrid")[0]);








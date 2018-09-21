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

ko.applyBindings(viewModel);

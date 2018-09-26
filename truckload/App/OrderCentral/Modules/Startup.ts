import { Main } from "../Classes/Main"
import {Globals} from "../../Shared/Global"
import * as ko from 'knockout';

export module Startup {
    export function init():Main {
        var orderCentral = new Main();

        ko.bindingHandlers.kendoGrid.options = {
            height: Globals.gridHeight,
            scrollable: true,
            columns: [{
                    field: "OrderID",
                    title: "Orders", headerAttributes: {
                        style: "display: none"
                    }
                }
            ],
            pageable: { alwaysVisible: false, pageSize: 8 }
        };
        
        ko.applyBindings(orderCentral.viewModelOrders, $("koOrderModel")[0]);

        console.log("finished startup");
        return orderCentral;
    }

}
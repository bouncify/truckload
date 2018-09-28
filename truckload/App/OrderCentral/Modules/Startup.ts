import { Main } from "../Classes/Main"
import {Globals} from "../../Shared/Global"
import * as ko from 'knockout';

export module Startup {
    export function init():Main {
        var orderCentral = new Main();
        var gridHeight = Globals.orderCellHeight * Globals.ordersPageSize;
        $("#gridHeight").text(gridHeight);
        //alert(gridHeight);

        ko.bindingHandlers.kendoGrid.options = {
            height: gridHeight,
            scrollable: true,
            columns: [{
                    field: "OrderID",
                    title: "Orders", headerAttributes: {
                        style: "display: none"
                    }
                } 
            ],
            pageable: { alwaysVisible: false, pageSize: Globals.ordersPageSize }
        };
        
        ko.applyBindings(orderCentral.viewModelOrders, $("koOrderModel")[0]);

        console.log("finished startup");
        return orderCentral;
    }

}
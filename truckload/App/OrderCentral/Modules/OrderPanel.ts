import { SharedModel } from "../Models/SharedModel"
import { OrderModel } from "../Models/OrderModel"
import * as ko from 'knockout';

export module OrderPanel {
    export function init(sharedModel: SharedModel, orderModel: OrderModel) {

        var gridHeight = sharedModel.orderCellHeight * sharedModel.ordersPageSize;
        $("#gridHeight").text(gridHeight);


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
            pageable: { alwaysVisible: false, pageSize: sharedModel.ordersPageSize }
        };

        ko.applyBindings(orderModel, $("#koOrderModel")[0]);
        
        console.log("finished order panel setup");
    }

}
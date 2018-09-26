import { ControlHelper } from "../../Shared/ControlHelper"
import { Globals } from "../../Shared/Global"
import { OrderModel } from "../Models/OrderModel"


import 'knockout-kendo/build/knockout-kendo';

export class Main {
    viewModelOrders: OrderModel;
    
    gridArray: boolean[] = [false, false, false, false];

    setWaitSpinner = (isLoading: boolean, gridName: string) => {
        switch (gridName) {
            case Globals.orderGridName:
                this.gridArray[0] = isLoading;
                break;
            case Globals.load1GridName:
                this.gridArray[1] = isLoading;
                break;
            case Globals.load2GridName:
                this.gridArray[2] = isLoading;
                break;
            case Globals.load3GridName:
                this.gridArray[3] = isLoading;
                break;
        }

        var isSetSpinning = false;
        for (let entry of this.gridArray) {
            if (entry) isSetSpinning = true;
        }

        var orderGrid = $(Globals.orderGridName).data("kendoGrid");
        if (orderGrid) {
            kendo.ui.progress(orderGrid.element, isSetSpinning);
        }
        var loadGrid1 = $(Globals.load1GridName).data("kendoGrid");
        if (loadGrid1) {
            kendo.ui.progress(loadGrid1.element, isSetSpinning);
            kendo.ui.progress($(Globals.load2GridName).data("kendoGrid").element, isSetSpinning);
            kendo.ui.progress($(Globals.load3GridName).data("kendoGrid").element, isSetSpinning);
        }
    };

    constructor() {
        this.viewModelOrders = new OrderModel(this.setWaitSpinner, Globals.orderGridName);
    }
}
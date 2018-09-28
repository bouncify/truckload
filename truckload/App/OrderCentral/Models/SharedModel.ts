import { AjaxHelper } from "../../Shared/Classes/AjaxHelper"
import { Setting } from "../Classes/Setting"


export class SharedModel {
    public ajaxHelper: AjaxHelper;

    public orderGridName = "#koOrderGrid";
    public load1GridName = "#koLoadsDay1";
    public load2GridName = "#koLoadsDay2";
    public load3GridName = "#koLoadsDay3";
    
    public ordersPageSize = 8;
    public bodyWidth = 1452;
    public orderCellHeight = 90;

    gridArray: boolean[] = [false, false, false, false];

    setWaitSpinner = (isLoading: boolean, gridName: string) => {
        switch (gridName) {
        case this.orderGridName:
            this.gridArray[0] = isLoading;
            break;
        case this.load1GridName:
            this.gridArray[1] = isLoading;
            break;
        case this.load2GridName:
            this.gridArray[2] = isLoading;
            break;
        case this.load3GridName:
            this.gridArray[3] = isLoading;
            break;
        }

        var isSetSpinning = false;
        for (let entry of this.gridArray) {
            if (entry) isSetSpinning = true;
        }

        var orderGrid = $(this.orderGridName).data("kendoGrid");
        if (orderGrid) {
            kendo.ui.progress(orderGrid.element, isSetSpinning);
        }
        var loadGrid1 = $(this.load1GridName).data("kendoGrid");
        if (loadGrid1) {
            kendo.ui.progress(loadGrid1.element, isSetSpinning);
            kendo.ui.progress($(this.load2GridName).data("kendoGrid").element, isSetSpinning);
            kendo.ui.progress($(this.load3GridName).data("kendoGrid").element, isSetSpinning);
        }
    };


    constructor() {
        this.ajaxHelper = new AjaxHelper;

        var settings:Setting[];

        //ajax.get("/OrderCentral/GetSettings", (data: any) => {

        //    settings = data;

        //}, undefined);
    }
}
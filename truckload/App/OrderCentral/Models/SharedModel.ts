import { AjaxHelper } from "../../Shared/Classes/AjaxHelper"
import { Setting } from "../Classes/Setting"
import { KoDropDownData } from "../KoClasses/KoDropDownData"

export class SharedModel {
    public ajax: AjaxHelper;
    public dropDownData: KoDropDownData;

    public gridHeight = 1000;

    public orderGridName = "#koOrderGrid";
    public load1GridName = "#koLoadsDay1";
    public load2GridName = "#koLoadsDay2";
    public load3GridName = "#koLoadsDay3";

    public ordersPageSize = 8;
    //public bodyWidth = 1452;
    public orderCellHeight = 90;
    public visibleLoadCols = 3;
    public loadColWidth = 357;
    public orderPanelSeedHeight = 0;

    public loadCol1Date = new Date();//Start With today's date
    
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

    constructor(settings: Setting[]) {
        this.ajax = new AjaxHelper;
        this.dropDownData = new KoDropDownData(this.ajax);

        for (let setting of settings) {
            if (setting.name === "OrderGridName") this.orderGridName = setting.value;
            if (setting.name === "LoadGridName") this.load1GridName = setting.value;
            if (setting.name === "OrdersPageSize") this.ordersPageSize = Number(setting.value);
            if (setting.name === "OrderCellHeight") this.orderCellHeight = Number(setting.value);
            if (setting.name === "LoadsVisible") this.visibleLoadCols = Number(setting.value);
            if (setting.name === "OrderPanelSeedHeight") this.orderPanelSeedHeight = Number(setting.value);

            this.gridHeight = (this.orderCellHeight * this.ordersPageSize) + this.orderPanelSeedHeight;            
        }
    }
}
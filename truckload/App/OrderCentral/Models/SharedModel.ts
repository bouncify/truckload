import { AjaxHelper } from "../../Shared/Classes/AjaxHelper"
import { Setting } from "../Classes/Setting"
import { KoDropDownData } from "../KoClasses/KoDropDownData"

export class SharedModel {
    public ajax: AjaxHelper;
    public dropDownData: KoDropDownData;

    public gridHeight = 1000;

    public orderGridName = "#koOrderGrid";
    public loadGridName = "#koLoadGrid_";

    public ordersPageSize = 8;
    //public bodyWidth = 1452;
    public orderCellHeight = 90;
    public visibleLoadCols = 3;
    public loadColWidth = 357;
    public orderPanelSeedHeight = 0;
    public accessLevel = 0;
    public baseUrl = "";

    setWaitSpinner = (isLoading: boolean, gridName: string) => {
        var grid = $(gridName).data("kendoGrid");

        if (grid) {
            kendo.ui.progress(grid.element, isLoading);
        }
    };

    constructor(settings: Setting[]) {
        this.ajax = new AjaxHelper;
        this.baseUrl = this.ajax.baseUrl;
        this.dropDownData = new KoDropDownData(this.ajax);

        for (let setting of settings) {
            if (setting.name === "OrderGridName") this.orderGridName = setting.value;
            if (setting.name === "LoadGridName") this.loadGridName = setting.value;
            if (setting.name === "OrdersPageSize") this.ordersPageSize = Number(setting.value);
            if (setting.name === "OrderCellHeight") this.orderCellHeight = Number(setting.value);
            if (setting.name === "LoadsVisible") this.visibleLoadCols = Number(setting.value);
            if (setting.name === "OrderPanelSeedHeight") this.orderPanelSeedHeight = Number(setting.value);
            if (setting.name === "AccessLevel") this.accessLevel = Number(setting.value);           
        }

        this.gridHeight = (this.orderCellHeight * this.ordersPageSize) + this.orderPanelSeedHeight;
    }
}
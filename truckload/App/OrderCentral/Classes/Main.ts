import { ControlHelper } from "../../Shared/ControlHelper"
import { Globals } from "../../Shared/Global"
import { OrderModel } from "../Models/OrderModel"
import { LoadModel } from "../Models/LoadModel"
import { SharedModel } from "../Models/SharedModel"
import { OrderPanel } from "../Modules/OrderPanel"
import { LoadPanels } from "../Modules/LoadPanels"
import { Setting } from "./Setting"
import { MessageService } from "../Classes/MessageService"
import { CrudMessage } from "../../Shared/Global"

import 'knockout-kendo/build/knockout-kendo';
import "jqueryui/jquery-ui.js"

export class Main {
    private shared: SharedModel;
    viewModelOrders: OrderModel;
    viewModelLoads: LoadModel;
    private messageService: MessageService;

    public dragOrder(ev: DragEvent) {
        if (ev.srcElement) {
            var divIdbits = ev.srcElement.id.split("_");
            var isFromLoad = divIdbits[0] === "loadOrder";
            var orderId = divIdbits[1];
            var dayNum = "";
            var fromLoadId = "";

            if (isFromLoad) {
                dayNum = divIdbits[2];
                fromLoadId = divIdbits[3];
            }

            ev.dataTransfer.setData("orderId", orderId);
            ev.dataTransfer.setData("isFromLoad", isFromLoad.toString());
            ev.dataTransfer.setData("dayNum", dayNum);
            ev.dataTransfer.setData("fromLoadId", fromLoadId);

            //alert("draggin!");
        }
    }

    public dropOrder(ev: any) {
        ev.preventDefault();
        var orderId = this.getOrderIdFromText(ev.dataTransfer.getData("orderId"));

        const targetLoadData = ev.currentTarget.id.split("_");
        var targetLoadId = targetLoadData[1];
        var targetLoadDay = targetLoadData[2];
        var sourceLoadDay = ev.dataTransfer.getData("dayNum");
        var isFromLoad = ev.dataTransfer.getData("isFromLoad") === "true";
        var fromLoadId = ev.dataTransfer.getData("fromLoadId");

        if (isFromLoad) {
            if (targetLoadId === fromLoadId) return;
            //setWaitSpinner(true, `#koLoadsDay${sourceLoadDay}`);
        } else {
            //setWaitSpinner(true, orderGridName);
        }

        //setWaitSpinner(true, `#koLoadsDay${targetLoadDay}`);

        var dataToSend = JSON.stringify({ orderId: orderId, loadId: targetLoadId });

        this.shared.ajax.post("/Loads/DropOrder",
            (dataResult: any) => {
                var objResult = JSON.parse(dataResult);
                var msg = objResult.message;
                var isMoved = msg.indexOf("has been moved to") >= 0;
                //alert(msg);
                if (!isMoved) {
                    alert(msg);
                }
            }, dataToSend);
    }

    public dropOrderOnOrders(ev: any) {
        var isFromLoad = ev.dataTransfer.getData("isFromLoad") === "true";
        var orderId = this.getOrderIdFromText(ev.dataTransfer.getData("orderId"));

        var dataToSend = JSON.stringify({ orderId: orderId });

        if (isFromLoad) {
            //setWaitSpinner(true, orderGridName);
            //setWaitSpinner(true, `#koLoadsDay${ev.dataTransfer.getData("dayNum")}`);
            this.shared.ajax.post("/Loads/ResetOrder",
                (dataResult: any) => {
                    var objResult = JSON.parse(dataResult);
                    var msg = objResult.message;
                    var isMoved = msg.indexOf("has been removed from") >= 0;

                    if (!isMoved) {
                        alert(msg);
                    }
                }, dataToSend);
        }
    }

    public allowDropOrder(ev: DragEvent) {
        ev.preventDefault();
    }

    private getOrderIdFromText(strId: string): number {
        var result = 0;

        if (strId) {
            const stAr = strId.split("_");
            result = Number(stAr[stAr.length - 1]);
        }

        return result;
    }

    public receiveDbUpdateNotification = (message: CrudMessage) => {

        if (message.isLoad) {
            this.viewModelLoads.receiveDbUpdateLoadNotification(message);
        } else {
            this.viewModelOrders.receiveDbUpdateOrderNotification(message);
        }

        //ko.utils.arrayForEach(this.loadCols(), loadCol => {
        //    if (DateFunctions.isDateEqual(loadCol.loadDate(), message.theDate)) {
        //        loadCol.receiveRefreshNotification(message);
        //    }
        //});
    }

    constructor(settings: Setting[]) {
        this.shared = new SharedModel(settings);
        this.viewModelOrders = new OrderModel(this.shared);
        this.viewModelLoads = new LoadModel(this.shared, this.viewModelOrders.editOrderClick);
        
        LoadPanels.init(this.shared,this.viewModelLoads);
        OrderPanel.init(this.shared, this.viewModelOrders);

        this.messageService = new MessageService(this.receiveDbUpdateNotification);
    }
}
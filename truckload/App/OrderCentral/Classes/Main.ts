import { ControlHelper } from "../../Shared/ControlHelper"
import { Globals } from "../../Shared/Global"
import { OrderModel } from "../Models/OrderModel"
import { SharedModel } from "../Models/SharedModel"
import { OrderPanel } from "../Modules/OrderPanel"
import { MainScreen } from "../Modules/MainScreen"
import { Setting } from "./Setting"

import 'knockout-kendo/build/knockout-kendo';

export class Main {
    private sharedModel: SharedModel;
    viewModelOrders: OrderModel;


    constructor(settings: Setting[]) {
        this.sharedModel = new SharedModel(settings);
        this.viewModelOrders = new OrderModel(this.sharedModel);

        MainScreen.init(this.sharedModel);
        OrderPanel.init(this.sharedModel, this.viewModelOrders);
    }
}
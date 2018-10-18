import { ControlHelper } from "../../Shared/ControlHelper"
import { Globals } from "../../Shared/Global"
import { OrderModel } from "../Models/OrderModel"
import { LoadModel } from "../Models/LoadModel"
import { SharedModel } from "../Models/SharedModel"
import { OrderPanel } from "../Modules/OrderPanel"
import { LoadPanels } from "../Modules/LoadPanels"
import { Setting } from "./Setting"

import 'knockout-kendo/build/knockout-kendo';

export class Main {
    private sharedModel: SharedModel;
    viewModelOrders: OrderModel;
    viewModelLoads: LoadModel;


    constructor(settings: Setting[]) {
        this.sharedModel = new SharedModel(settings);
        this.viewModelOrders = new OrderModel(this.sharedModel);
        this.viewModelLoads = new LoadModel(this.sharedModel);

        
        LoadPanels.init(this.sharedModel,this.viewModelLoads);
        OrderPanel.init(this.sharedModel, this.viewModelOrders);
    }
}
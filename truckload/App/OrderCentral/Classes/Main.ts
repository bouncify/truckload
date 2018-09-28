import { ControlHelper } from "../../Shared/ControlHelper"
import { Globals } from "../../Shared/Global"
import { OrderModel } from "../Models/OrderModel"
import {SharedModel} from "../Models/SharedModel"
import { AjaxHelper } from "../../Shared/Classes/AjaxHelper"
import {OrderPanel} from "../Modules/OrderPanel"

import 'knockout-kendo/build/knockout-kendo';

export class Main {
    private sharedModel: SharedModel;
    viewModelOrders: OrderModel;
        


    constructor() {
        this.sharedModel = new SharedModel();
        this.viewModelOrders = new OrderModel(this.sharedModel);
        
        OrderPanel.init(this.sharedModel,this.viewModelOrders);
    }
}
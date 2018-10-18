import { SharedModel } from "../Models/SharedModel"
//import { OrderModel } from "../Models/OrderModel"
//import * as ko from 'knockout';

export module MainScreen {
    export function init(sharedModel: SharedModel) {

        var screenWidth = sharedModel.loadColWidth * (sharedModel.visibleLoadCols + 1);

        $("#containerBody").width(screenWidth);

        //sharedModel.visibleLoads
        //sharedModel.bodyWidth
        //sharedModel.gridArray


        console.log("finished main screen setup");
    }

}
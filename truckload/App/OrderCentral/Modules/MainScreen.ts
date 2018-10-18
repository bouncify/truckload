import { SharedModel } from "../Models/SharedModel"
//import { OrderModel } from "../Models/OrderModel"
//import * as ko from 'knockout';

export module MainScreen {
    export function init(sharedModel: SharedModel) {

        var totalLoadCols = sharedModel.visibleLoadCols;
        
        var screenWidth = sharedModel.loadColWidth * (totalLoadCols + 1);

        $("#containerBody").width(screenWidth);

        //$("#loadCol1").height(sharedModel.gridHeight);

        for (let i = 1; i < totalLoadCols ; i++) {
            var colNo = i + 1;

            var newCol = $("#loadCol1").clone();
            newCol.attr("id", `loadCol${colNo}`);
            newCol.text("Load Col" + colNo);

            newCol.insertAfter("div.loadCol:last");


        }



        console.log("finished main screen setup");
    }

}
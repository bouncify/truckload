import { SharedModel } from "../Models/SharedModel"
//import { OrderModel } from "../Models/OrderModel"
//import * as ko from 'knockout';

export module MainScreen {
    export function init(sharedModel: SharedModel) {

        var totalLoadCols = sharedModel.visibleLoadCols;

        var screenWidth = sharedModel.loadColWidth * (totalLoadCols + 1);

        $("#containerBody").width(screenWidth);

        for (let i = 1; i < totalLoadCols ; i++) {
            var colNo = i + 1;

            var newCol = $("#loadCol1").clone();
            newCol.attr("id", `loadCol${colNo}`);
            newCol.text("Load Col" + colNo);

            newCol.insertAfter("div.loadCol:last");

            //.insertAfter("div.loadCol:last");
            //console.log(i);
        }

        //sharedModel.visibleLoads
        //sharedModel.bodyWidth
        //sharedModel.gridArray

        //var amount = 5;
        //for (var i = 0; i < amount; i++) {
        //    var newDiv = document.createElement("div");
        //    newDiv.innerText = "wibble";
        //    //newDiv.className = "bluestrip";
        //    document.body.appendChild(newDiv);
        //    //console.log("This is repeat " + i);
        //}

        console.log("finished main screen setup");
    }

}
import { SharedModel } from "../Models/SharedModel"
import { LoadModel } from "../Models/LoadModel"
import * as ko from 'knockout';

export module LoadPanels {
    export function init(sharedModel: SharedModel, loadModel: LoadModel) {

        var totalLoadCols = sharedModel.visibleLoadCols;
        
        var screenWidth = sharedModel.loadColWidth * (totalLoadCols + 1);

        $("#containerBody").width(screenWidth);
        //$("#loadPanels").height(sharedModel.gridHeight);



        //$("#loadCol1").height(sharedModel.gridHeight);

        //for (let i = 1; i < totalLoadCols ; i++) {
        //    var colNo = i + 1;

        //    var newCol = $("#loadCol1").clone();
        //    newCol.attr("id", `loadCol${colNo}`);
        //    //newCol.text("Load Col" + colNo);

        //    newCol.insertAfter("div.loadCol:last");
        //}

        ko.applyBindings(loadModel, $("#loadPanels")[0]);

        var calendarButton = $("#miniLoadDateButton1")[0].offsetParent.children[1].childNodes[0] as HTMLSpanElement;

        calendarButton.style.position = "absolute";
        calendarButton.style.marginTop = "2px";
        calendarButton.style.marginLeft = "0";
        calendarButton.style.left = "7px";

        console.log("finished main screen setup");
    }

}
import { SharedModel } from "../Models/SharedModel"
import { LoadModel } from "../Models/LoadModel"
import * as ko from 'knockout';

export module LoadPanels {
    export function init(sharedModel: SharedModel, loadModel: LoadModel) {

        var totalLoadCols = sharedModel.visibleLoadCols;        
        var screenWidth = sharedModel.loadColWidth * (totalLoadCols + 1);

        $("#containerBody").width(screenWidth);

        var gridHeight = sharedModel.gridHeight;

        ko.bindingHandlers.kendoGrid.options = {
            height: gridHeight,
            scrollable: true,
            columns: [{
                    field: "LoadId",
                    title: "Load", headerAttributes: {
                        style: "display: none"
                    }
                }
            ]
        };

        ko.applyBindings(loadModel, $("#loadPanels")[0]);

        for (var i = 1; i < totalLoadCols + 1; i++) {
            $("#koModalCreateLoad_"+i).draggable({ handle: ".modal-header" });
        }

        var calendarButton = $("#miniLoadDateButton1")[0].offsetParent.children[1].childNodes[0] as HTMLSpanElement;

        calendarButton.style.position = "absolute";
        calendarButton.style.marginTop = "2px";
        calendarButton.style.marginLeft = "0";
        calendarButton.style.left = "7px";

        console.log("finished main screen setup");
    }

}
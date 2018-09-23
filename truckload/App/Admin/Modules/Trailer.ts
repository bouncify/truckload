import { CrudScreenDetail } from "../../Shared/Classes/CrudScreenDetail"
import { CrudScreenAutoSave } from "../../Shared/Classes/CrudScreenAutoSave"

export module Trailer {
    export function init(): CrudScreenAutoSave {
        var crudScreenDetail = new CrudScreenDetail();
        crudScreenDetail.entityName = "Trailer";
        crudScreenDetail.gridName = "#grid";
        crudScreenDetail.checkBoxList = ["IsActive"];
        crudScreenDetail.primaryKeyFieldName = "TrailerId";
        crudScreenDetail.deleteConformFieldList = ["TrailerDescription"];
        crudScreenDetail.deleteConfirmText = "Are you sure you want to delete this trailer?";
        crudScreenDetail.deleteUrl = "/Trailer/Delete";
        crudScreenDetail.addPromptString = "Enter Trailer Name";
        crudScreenDetail.additionalInfoFunction = (addNewResultString: string) => {

            var rtnVal = {
                trailerDescription: addNewResultString,
                axlesDescription: "2",
                trailerTypeId: 1,
                unitOfMeasureId: 1
            }

            return rtnVal;
        };

        var crudScreenModule = new CrudScreenAutoSave(crudScreenDetail);

        return crudScreenModule;
    }
}

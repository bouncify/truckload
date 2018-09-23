import { CrudScreenDetail } from "../../Shared/Classes/CrudScreenDetail"
import { CrudScreenAutoSave } from "../../Shared/Classes/CrudScreenAutoSave"
import { splitNameFirstLast } from "../../Shared/String"


export module Truck {
    export function init(): CrudScreenAutoSave {
        var crudScreenDetail = new CrudScreenDetail();
        crudScreenDetail.entityName = "Truck";
        crudScreenDetail.gridName = "#grid";
        crudScreenDetail.checkBoxList = ["IsActive"];
        crudScreenDetail.primaryKeyFieldName = "TruckId";
        crudScreenDetail.deleteConformFieldList = ["TruckDescription"];
        crudScreenDetail.deleteConfirmText = "Are you sure you want to delete this truck?";
        crudScreenDetail.deleteUrl = "/Truck/Delete";
        crudScreenDetail.addPromptString = "Enter Truck Name";
        crudScreenDetail.additionalInfoFunction = (addNewResultString: string) => {
            var names = splitNameFirstLast(addNewResultString);

            var rtnVal = {
                truckDescription: addNewResultString
            }

            return rtnVal;
        };

        var crudScreenModule = new CrudScreenAutoSave(crudScreenDetail);

        return crudScreenModule;
    }
}

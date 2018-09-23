import { CrudScreenDetail } from "../../Shared/Classes/CrudScreenDetail"
import { CrudScreenAutoSave } from "../../Shared/Classes/CrudScreenAutoSave"
import { splitNameFirstLast } from "../../Shared/String"


export module Warehouse {
    export function init(): CrudScreenAutoSave {
        var crudScreenDetail = new CrudScreenDetail();
        crudScreenDetail.entityName = "Warehouse";
        crudScreenDetail.gridName = "#grid";
        crudScreenDetail.checkBoxList = ["IsActive"];
        crudScreenDetail.primaryKeyFieldName = "WarehouseId";
        crudScreenDetail.deleteConformFieldList = ["WarehouseCode", "Description"];
        crudScreenDetail.deleteConfirmText = "Are you sure you want to delete this warehouse?";
        crudScreenDetail.deleteUrl = "/Warehouse/Delete";
        crudScreenDetail.addPromptString = "Enter Warehouse Code";
        crudScreenDetail.additionalInfoFunction = (addNewResultString: string) => {

            var rtnVal = {
                warehouseCode: addNewResultString,
                description: "New Warehouse"
            }

            return rtnVal;
        };

        var crudScreenModule = new CrudScreenAutoSave(crudScreenDetail);

        return crudScreenModule;
    }
}


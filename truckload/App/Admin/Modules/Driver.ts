﻿import { CrudScreenDetail } from "../../Shared/Classes/CrudScreenDetail"
import { CrudScreenAutoSave } from "../../Shared/Classes/CrudScreenAutoSave"
import { StringFunctions } from "../../Shared/StringFunctions"


export module Driver {
    export function init(): CrudScreenAutoSave {
        var crudScreenDetail = new CrudScreenDetail();
        crudScreenDetail.entityName = "Driver";
        crudScreenDetail.gridName = "#grid";
        crudScreenDetail.checkBoxList = ["IsActive", "IsEmployee"];
        crudScreenDetail.primaryKeyFieldName = "DriverId";
        crudScreenDetail.deleteConformFieldList = ["FirstName", "LastName"];
        crudScreenDetail.deleteConfirmText = "Are you sure you want to delete this driver?";
        crudScreenDetail.deleteUrl = "/Driver/Delete";
        crudScreenDetail.addPromptString = "Enter Driver Name";
        crudScreenDetail.additionalInfoFunction = (addNewResultString: string) => {
            var names = StringFunctions.splitNameFirstLast(addNewResultString);

            var rtnVal = {
                firstName: names[0],
                lastName: names[1]
            }
        
            return rtnVal;
        };

        var crudScreenModule = new CrudScreenAutoSave(crudScreenDetail);

        return crudScreenModule;
    }
}


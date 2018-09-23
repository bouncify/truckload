import { CrudScreenDetail } from "../../Shared/Classes/CrudScreenDetail"
import { CrudScreenAutoSave } from "../../Shared/Classes/CrudScreenAutoSave"


export module UserLogin {
    export function init(): CrudScreenAutoSave {
        var crudScreenDetail = new CrudScreenDetail();
        crudScreenDetail.entityName = "UserLogin";
        crudScreenDetail.gridName = "#grid";
        crudScreenDetail.checkBoxList = [];
        crudScreenDetail.primaryKeyFieldName = "UserLoginId";
        crudScreenDetail.deleteConformFieldList = ["UserId", "UserName"];
        crudScreenDetail.deleteConfirmText = "Are you sure you want to delete this user login?";
        crudScreenDetail.deleteUrl = "/UserLogin/Delete";
        crudScreenDetail.addPromptString = "Enter User Login Id";
        crudScreenDetail.additionalInfoFunction = (addNewResultString: string) => {
            var rtnVal = {
                userId: addNewResultString
            }

            return rtnVal;
        };

        var crudScreenModule = new CrudScreenAutoSave(crudScreenDetail);

        return crudScreenModule;
    }
}




export class CrudScreenDetail {
    entityName: string = "";
    gridName: string = "";
    checkBoxList: string[] = [];
    primaryKeyFieldName: string = "";
    deleteConformFieldList: string[] = [];
    deleteConfirmText: string = "";
    deleteUrl: string = "";
    addPromptString: string = "";
    additionalInfoFunction: Function = () => { };
}

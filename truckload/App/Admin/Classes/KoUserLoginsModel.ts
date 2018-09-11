
import * as ko from 'knockout';
import { SelectListItem } from "../../Shared/Classes/SelectListItem"
import { KoUserLogin } from "./KoUserLogin"
import { AjaxHelper } from "../../Shared/Classes/AjaxHelper"

export class KoUserLoginsModel {
    private accessLevels: SelectListItem[] = [];
    public userLogins = ko.observableArray([] as KoUserLogin[]);
    private ajaxHelper: AjaxHelper;

    private loadAll() {
        this.userLogins.removeAll();
        this.ajaxHelper.get("/Admin/GetUserLogins", (data: any) => {
            ko.mapping.fromJSON(data, {}, this.userLogins);
        }, undefined);
    }

    constructor(ajaxHelper: AjaxHelper) {
        this.ajaxHelper = ajaxHelper;
        this.ajaxHelper.get("/Admin/GetAccessLevels", (data: any) => {
            this.accessLevels = JSON.parse(data);
            this.loadAll();

        }, undefined);

    }
}
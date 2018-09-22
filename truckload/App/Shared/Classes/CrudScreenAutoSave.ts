
import { ControlHelper } from "../ControlHelper"
import { CrudScreenDetail } from "./CrudScreenDetail"
import { AjaxHelper } from "./AjaxHelper"


export class CrudScreenAutoSave {
    private scrDetail: CrudScreenDetail;
    private addNewResultString: string = "";
    private ajaxHelper = new AjaxHelper();

    public btnDeleteClick(e: any) {
        var tblRow = e.closest("tr");

        var grid = $(this.scrDetail.gridName).data("kendoGrid");
        var id = parseInt(tblRow.cells[0].innerText);
        const dataRow: any = grid.dataSource.get(id);

        var headerDetail = dataRow[this.scrDetail.primaryKeyFieldName] + ",";

        for (let field of this.scrDetail.deleteConformFieldList) {
            headerDetail += " " + dataRow[field];
        }

        ControlHelper.lbConfirm(this.scrDetail.deleteConfirmText, (result: boolean) => {
            if (result) {
                var dataToSend = JSON.stringify({ id: id });

                this.ajaxHelper.post(this.scrDetail.deleteUrl,
                    (dataResult: string) => {
                        var resultText = JSON.parse(dataResult);
                        var isDeleted = resultText.indexOf("has been deleted") >= 0;

                        if (!isDeleted) {
                            ControlHelper.lbAlert(resultText);
                        } else {
                            grid.removeRow(tblRow);
                        }

                    }, dataToSend);
            }
        }, headerDetail);
    }

    public onDataSourceError(e: any) {
        ControlHelper.gridErrorHandler(e);
    }

    public onEdit(e: any) {
        const inputName = e.container.find("input").attr("name");
        const myInput = e.container.find(`input[name="${inputName}"]`);
        myInput.select();
    }

    public additionalInfo = () => {
        return this.scrDetail.additionalInfoFunction(this.addNewResultString);
    }

    public updateDomObjects = () => {
        var scrDetail = this.scrDetail;
        for (let chkBox of scrDetail.checkBoxList) {
            $(`${scrDetail.gridName} .k-grid-content`).on("change", `input.chkbx${chkBox}`, (e: any) => {
                var checkbox = <HTMLInputElement>e.target;

                var grid = $(scrDetail.gridName).data("kendoGrid"),
                    dataItem = grid.dataItem($(checkbox).closest("tr"));

                dataItem.set(chkBox, checkbox.checked);
            });
        }

        var newButton = $(scrDetail.gridName).find(`.k-grid-Add${scrDetail.entityName}`);
        newButton.prepend("<span class=\"k-icon k-i-plus\"></span>");

        newButton.on("click",
            e => {
                e.preventDefault();

                ControlHelper.lbPrompt(scrDetail.addPromptString, (isOk: boolean, resultText: string) => {
                    if (isOk) {
                        this.addNewResultString = resultText;
                        var grid = $(scrDetail.gridName).data("kendoGrid");
                        var dataSource = grid.dataSource;
                        var total = dataSource.data().length;

                        dataSource.insert(total, {});

                        setTimeout(() => {
                            //added delay to ensure page is refreshed once data is added, not a great solution... but
                            var lastPage = grid.dataSource.totalPages();
                            var pageSize = grid.dataSource.pageSize();
                            grid.dataSource.page(lastPage);
                            grid.dataSource.query({ page: lastPage, pageSize: pageSize });
                        }, 300);
                    }
                }, `Add ${scrDetail.entityName}`);
            });
    }

    constructor(scrDetail: CrudScreenDetail) {
        this.scrDetail = scrDetail;
    }
}

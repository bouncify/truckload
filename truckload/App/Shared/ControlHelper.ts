
export module ControlHelper {
    export function gridErrorHandler(e: any) {
        const errors = e.errors;
        if (typeof errors === "string") {
            alert(errors);
        } else {
            var message = "";
            if (errors) {
                $(".k-grid").each(() => {
                    var grid = $(e.target).data("kendoGrid");

                    if (grid) {
                        // ReSharper disable once CoercedEqualsUsing
                        if (grid.dataSource == e.sender) {
                            // We have a winner!
                            if (!grid.dataSource.options.batch) {// keep changes if batch mode
                                //prevent the dataBinding from refreshing so the current edit remains
                                grid.cancelChanges();
                            }
                        }
                    }
                });

                $.each(errors, (key, value) => {
                    if ("errors" in value) {
                        $.each(value.errors, function () {
                            message += this + "\n";
                        });
                    }
                });
            }
            if (e.errorThrown && message === "") {

                const errorThrown = e.errorThrown;
                if (typeof errorThrown === "string") {
                    message += errorThrown.toString();
                }
            }
            alert(`Error:\n${message}`);
        }
    }

    export function lbAlert(text: string) {
        var dialog = $("#customAlert");

        if (dialog.text()) {
            $("#customAlertText").text(text);
            dialog.data("kendoDialog").open();
        } else {
            dialog.kendoDialog({
                width: "450px",
                buttonLayout: "normal",
                title: "Loadboard",
                closable: true,
                modal: true,
                content: "<span id='customAlertText'><p>" + text + "<p></span>",
                actions: [
                    { text: 'OK', primary: true }
                ]
            });
        }
    }

    export function lbConfirm(text: string, confirmResult: Function, title = "Loadboard") {
        var dialog = $("#customConfirm");

        var isExisting = false;
        if (dialog.text()) isExisting = true;

        dialog.kendoDialog({
            width: "450px",
            buttonLayout: "normal",
            title: title,
            closable: true,
            modal: true,
            content: "<span id='customAlertText'><p>" + text + "<p></span>",
            actions: [
                { text: 'OK', primary: true, action() { confirmResult(true); } },
                { text: 'Cancel', action() { confirmResult(false); } }
            ]
        });

        if (isExisting) dialog.data("kendoDialog").open();
    }

    export function lbPrompt(text: string, confirmResult: Function, title = "Loadboard", initValue = "") {
        var dialog = $("#customPrompt");

        var isExisting = false;
        if (dialog.text()) isExisting = true;

        var bodyHtml = `
    <div class='row form-group'>
        <div class='col-md-4'>
            <p>${text}</p>
        </div>
    </div>
    <div class='row form-group'>
        <div class="col-xs-6"> <input id='customPromptResult' type='search' value='${initValue}' class='form-control'> </div>
    </div>
        `;

        dialog.kendoDialog({
            width: "450px",
            buttonLayout: "normal",
            title: title,
            closable: true,
            modal: true,
            content: bodyHtml,
            actions: [
                { text: 'OK', primary: true, action() { confirmResult(true, $("#customPromptResult").val()); } },
                { text: 'Cancel', action() { confirmResult(false); } }
            ]
        });

        if (isExisting) dialog.data("kendoDialog").open();
        $("#customPromptResult").focus();

        $("#customPromptResult").on("keydown",
            e => {
                //if current key is Enter
                if (e.keyCode === 13) {
                    dialog.data("kendoDialog").close();
                    confirmResult(true, $("#customPromptResult").val());
                }
            });
    }
}
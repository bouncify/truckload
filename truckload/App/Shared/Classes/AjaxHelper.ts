
export class AjaxHelper {
    private baseUrl: string;

    public post(url: string, successFunction: any, dataSubmitted: any) {
        var postUrl = this.baseUrl + url;

        $.ajax({
            url: postUrl,
            type: "POST",
            data: dataSubmitted,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success(dataResult) {
                if (typeof successFunction === "function") {
                    successFunction(dataResult);
                }
            },
            error(xhr: any, status: any, error: any) {
                var msg = status.toUpperCase();
                msg += "\n\nFailed to load resource: the server responded with a status of " + xhr.status + " (" + error + ")";
                msg += "\n\nPOST " + postUrl;

                alert(msg);
            }
        });
    }

    public get(url: string, successFunction: any, dataToSend: any) {
        var postUrl = this.baseUrl + url;

        $.ajax({
            url: postUrl,
            type: "GET",
            data: dataToSend,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success(data) {
                if (typeof successFunction === "function") {
                    successFunction(data);
                }
            },
            error(xhr: any, status: any, error: any) {
                var msg = status.toUpperCase();
                msg += "\n\nFailed to load resource: the server responded with a status of " + xhr.status + " (" + error + ")";
                msg += "\n\nPOST " + postUrl;

                alert(msg);
            }
        });
    }

    constructor() {
        this.baseUrl = $("#baseUrl").text();
    }
}






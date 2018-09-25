import { ControlHelper } from "../../Shared/ControlHelper"

export class Main {

    orderNumberFilterText = "";

    public setOrderFilter() {

        ControlHelper.lbPrompt("Enter Order Number:", (result: boolean, resultString: string) => {
            if (result) {
                this.orderNumberFilterText = resultString;

                //viewModelOrders.loadAll(orderNumberFilterText);

                var filterIcon = $("#orderFilterIcon");

                if (this.orderNumberFilterText) {
                    filterIcon.css("color", "red");
                } else {
                    filterIcon.css("color", "black");
                }
            }
        }, "Order Filter", this.orderNumberFilterText);
    }
}
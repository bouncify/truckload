"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import "./../Content/Site.css";
require("./css/Site.less");
require("bootstrap");
require("jquery-validation");
var baseUrl = window.location.origin + $("#SiteDirectory").val();
require("kendo-ui-core");
$("#dropDownList").kendoDropDownList({
    dataTextField: "text",
    dataValueField: "value",
    dataSource: [
        { text: "Item1", value: "1" },
        { text: "Item2", value: "2" }
    ]
});
//alert(baseUrl);
//# sourceMappingURL=layout.js.map
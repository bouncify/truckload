"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import "./../Content/Site.css";
require("./content/css/Site.less");
require("bootstrap");
require("jquery-validation");
require("kendo-ui-core/js/kendo.dropdownlist.js");
//import "kendo-ui-core/css/web/kendo.common.core.min.css";
//import "kendo-ui-core/css/web/kendo.default.min.css";
// on document ready
$(function () {
    var baseUrl = window.location.origin + $("#SiteDirectory").val();
    $("#sel").kendoDropDownList();
    $("#dropDownList").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
        ]
    });
});
//import "kendo-ui-core"
//alert(baseUrl);
//# sourceMappingURL=layout.js.map
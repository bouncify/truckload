//import "./../Content/Site.css";
import "./css/Site.less";
import "bootstrap"
import "jquery-validation"

var baseUrl = window.location.origin + $("#SiteDirectory").val();

import "kendo-ui-core"


$("#dropDownList").kendoDropDownList({
    dataTextField: "text",
    dataValueField: "value",
    dataSource: [
        { text: "Item1", value: "1" },
        { text: "Item2", value: "2" }
    ]
});


//alert(baseUrl);


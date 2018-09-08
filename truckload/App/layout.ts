//import "./../Content/Site.css";
import "./content/css/Site.less";

import "bootstrap"
import "jquery-validation"

import "kendo-ui-core/js/kendo.dropdownlist.js"
import "kendo-ui-core/js/kendo.menu.js"

//import "kendo-ui-core/css/web/kendo.common.core.min.css";
//import "kendo-ui-core/css/web/kendo.default.min.css";

// on document ready
$(() => {
    $("#jqueryVersion").text("jquery version is " + jQuery.fn.jquery);

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
    
    $("#menu").kendoMenu();

});



//import "kendo-ui-core"




//alert(baseUrl);


import { Main } from "../Classes/Main"
import {Globals} from "../../Shared/Global"
import * as ko from 'knockout';
import { AjaxHelper } from "../../Shared/Classes/AjaxHelper"


export module Startup {
    export function init(): Main {

        var orderCentral = new Main();





        console.log("finished startup");
        return orderCentral;
    }

}
import { Main } from "../Classes/Main"

export module Startup {
    export function init():Main {
        var orderCentral = new Main();

        return orderCentral;
    }

}


import { DbOperation } from "../../Shared/Global"
import { CrudMessage } from "../../Shared/Global"

//import "signalR";
//import * as signalR from "signalr";

export class OrderMessageService {
    //signalR connection reference
    private connection: SignalR;

    //signalR proxy reference
    private proxy: SignalR.Hub.Proxy;

    constructor(notificationFunction: Function) {
        //initialize connection
        this.connection = $.connection;

        //to create proxy give your hub class name as parameter. IMPORTANT: notice that I followed camel casing in giving class name
        this.proxy = $.connection.hub.createHubProxy("orderHub");

        //define a callback method for proxy
        this.proxy.on("add", (orderId) => {
            notificationFunction(new CrudMessage(orderId, DbOperation.Create));
        });

        this.proxy.on("refreshRequest", (orderId) => {
            notificationFunction(new CrudMessage(orderId, DbOperation.Read));
        });

        this.proxy.on("update", (orderId) => {
            notificationFunction(new CrudMessage(orderId, DbOperation.Update));
        });

        this.proxy.on("delete", (orderId) => {
            notificationFunction(new CrudMessage(orderId, DbOperation.Delete));
        });

        this.connection.hub.start().done(() => {
            //alert("connection started");
        });
    }

    //method for sending message
    broadcastMessage(msg: string) {
        //invoke method by its name using proxy 
        this.proxy.invoke("sendMessage", msg);
    }
}
import { DbOperation, CrudMessage } from "../../Shared/Global"

export class MessageService {
    //signalR connection reference
    private connection: SignalR;

    //signalR proxy reference
    private proxy: SignalR.Hub.Proxy;

    constructor(notificationFunction: Function) {
        //initialize connection
        this.connection = $.connection;

        //to create proxy give your hub class name as parameter. IMPORTANT: notice that I followed camel casing in giving class name
        this.proxy = $.connection.hub.createHubProxy("orderCentralHub");

        //define a callback method for proxy
        this.proxy.on("add", (id, loadDate, isLoad) => {
            notificationFunction(new CrudMessage(id, DbOperation.Create, loadDate, isLoad));
        });

        this.proxy.on("refreshRequest", (id, loadDate, isLoad) => {
            notificationFunction(new CrudMessage(id, DbOperation.Read, loadDate, isLoad));
        });

        this.proxy.on("update", (id, loadDate, isLoad) => {
            notificationFunction(new CrudMessage(id, DbOperation.Update, loadDate, isLoad));
        });

        this.proxy.on("delete", (id, loadDate, isLoad) => {
            notificationFunction(new CrudMessage(id, DbOperation.Delete, loadDate, isLoad));
        });

        //$(() => {
        //    alert("docready");
        //});

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
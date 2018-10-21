import { DbOperation, CrudMessage } from "../../Shared/Global"

export class LoadMessageService {
    //signalR connection reference
    private connection: SignalR;

    //signalR proxy reference
    private proxy: SignalR.Hub.Proxy;

    constructor(notificationFunction: Function) {
        //initialize connection
        this.connection = $.connection;

        //to create proxy give your hub class name as parameter. IMPORTANT: notice that I followed camel casing in giving class name
        this.proxy = $.connection.hub.createHubProxy("loadHub");

        //define a callback method for proxy
        this.proxy.on("add", (loadId, loadDate) => {
            notificationFunction(new CrudMessage(loadId, DbOperation.Create, loadDate));
        });

        this.proxy.on("refreshRequest", (loadId, loadDate) => {
            notificationFunction(new CrudMessage(loadId, DbOperation.Read, loadDate));
        });

        this.proxy.on("update", (loadId, loadDate) => {
            notificationFunction(new CrudMessage(loadId, DbOperation.Update, loadDate));
        });

        this.proxy.on("delete", (loadId, loadDate) => {
            notificationFunction(new CrudMessage(loadId, DbOperation.Delete, loadDate));
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
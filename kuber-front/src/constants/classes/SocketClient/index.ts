import { SocketOptions } from "socket.io-client";
import { ISocketClass } from "./ISocketClass";

export class SocketClass implements ISocketClass {
    host: string;
    options?: SocketOptions | undefined;
    static test?: string | undefined;
    constructor(host: string, test?: string, options?: SocketOptions){
        this.host = host;
        this.options = options;
        SocketClass.test = test;
    }
}
import { SocketOptions } from 'socket.io-client';

export interface ISocketClass{
    host: string;
    options?: SocketOptions
}

export default ISocketClass;
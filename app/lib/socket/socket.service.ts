import {Injectable} from 'angular2/core';
import {Logger} from '../logger/logger';

@Injectable()
export class SocketService {
    private _isConnected:boolean;
    private _socket;
    
    constructor(private _window: Window,
                private _logger:Logger) {}
    
    get isConnected() : boolean {
        return this._isConnected;
    }
    
    get socket() {
        return this._socket;
    }
    
    get myId() : string {
        return "/#" + this._socket.id;
    }
    
    connect(name:string, room:string) {
        this._logger.log(`Trying to connect to socket with name ${name} and room ${room}.`);
        // TODO somehow solve the io issue - it is not known to typescript, when using window.io
        this._socket = this._window['io'](this._window.location.host, {query: "room=" + room + "&name=" + name});
        return new Promise((resolve, reject) => {
            this._socket.on('connect', () => {
                this._logger.log(`Connected successfully.`);
                this._socket.removeListener('connect');
                this._socket.on('room', data => {
                    this._logger.log(`Got room number: ${data.room}.`);
                    this._socket.removeListener('room');
                    this._isConnected = true;
                    resolve(data.room);
                });
            });
            
            this._socket.on('error', data => {
                this._logger.log(`Caught an error connecting: ${data}.`);
                reject(data);
            });
            
            this._socket.on('disconnect', () => {
                this._logger.log(`Disconnected from server.`);
                this._isConnected = false;
            });
        });
    }
    
    disconnect() {
        this._logger.log(`Disconnecting socket.`);
        this._socket.disconnect();
        this._isConnected = false;        
    }
}
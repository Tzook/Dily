import {Injectable} from 'angular2/core';
import {Logger} from '../logger/logger';
import {SocketService} from './socket.service';

@Injectable()
export class EventsReceiverService {
    private _socket;
    private _events:Set<any>;
    
    constructor(private _logger:Logger,
                _socketService:SocketService) {
        this._socket = _socketService.socket;
        this._events = new Set();
    }
    
    private onEvent(event:string, fn:Function) {
        this._logger.log(`Adding ${event} listener.`);
        if (this._events.has(event)) {
            this._logger.log(`Already registered the event ${event}!`);
        }
        this._events.add(event);
        
        this._socket.on(event, data => {
            this._logger.log(`Got ${event} data: ${JSON.stringify(data)}.`);
            fn(data[event]);
        });
    }
    
    private removeOnEvent(event:string) {
        this._logger.log(`Removing ${event} listener.`);
        if (!this._events.has(event)) {
            this._logger.log(`Event ${event} was not registered!`);
        }
        this._events.delete(event);
        
        this._socket.removeListener(event);
    }
    
    onPlayers(fn:Function) {
        this.onEvent('users', fn);
    }
    
    removeOnPlayers() {
        this.removeOnEvent('users');
    }
    
    onTurn(fn:Function) {
        this.onEvent('turn', fn);
    }
    
    removeOnTurn() {
        this.removeOnEvent('turn');
    }
}
import {Injectable} from 'angular2/core';
import {Logger} from '../logger/logger';
import {SocketService} from './socket.service';

@Injectable()
export class EventsReceiverService {
    private _socket: any;
    private _events: Set<string> = new Set<string>();
    
    constructor(private _logger: Logger,
                _socketService: SocketService) {
        this._socket = _socketService.socket;
    }
    
    private _onEvent(event: string, fn: Function, ...args: string[]): void {
        this._logger.log(`Adding ${event} listener, with ${JSON.stringify(args)} arguments.`);
        if (this._events.has(event)) {
            this._logger.log(`Already registered the event ${event}!`);
        }
        this._events.add(event);
        
        this._socket.on(event, data => {
            this._logger.log(`Got ${event} data: ${JSON.stringify(data)}.`);
            let dataValues = this._grabDataFields(args, data); 
            fn.apply(fn, dataValues);
        });
    }
    
    private _removeOnEvent(event: string): void {
        this._logger.log(`Removing ${event} listener.`);
        if (!this._events.has(event)) {
            this._logger.log(`Event ${event} was not registered!`);
        }
        this._events.delete(event);
        
        this._socket.removeListener(event);
    }
    
    private _grabDataFields(args: string[], data: Object) : string[] {
        let dataValues = [];
        for (let i in args) {
            let argValue = args[i];
            dataValues[i] = data[argValue];
        }
        return dataValues;
    }
    
    public onPlayers(fn: Function): void {
        this._onEvent('users', fn, 'users');
    }
    public removeOnPlayers(): void {
        this._removeOnEvent('users');
    }
    
    public onTurn(fn:Function): void {
        this._onEvent('turn', fn, 'id', 'bet');
    }
    public removeOnTurn(): void {
        this._removeOnEvent('turn');
    }
    
    public onStart(fn:Function): void {
        this._onEvent('start', fn);
    }
    public removeOnStart(): void {
        this._removeOnEvent('start');
    }
    
    public onRoll(fn:Function): void {
        this._onEvent('roll', fn, 'id', 'result');
    }
    public removeOnRoll(): void {
        this._removeOnEvent('roll');
    }
    
    public onResults(fn:Function): void {
        this._onEvent('results', fn, 'id');
    }
    public removeOnResults(): void {
        this._removeOnEvent('results');
    }
    
    public onLoseDie(fn:Function): void {
        this._onEvent('lose-die', fn, 'id');
    }
    public removeOnLoseDie(): void {
        this._removeOnEvent('lose-die');
    }
}
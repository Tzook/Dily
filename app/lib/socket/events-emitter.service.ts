import {Injectable} from 'angular2/core';
import {Logger} from '../logger/logger';
import {SocketService} from './socket.service';

@Injectable()
export class EventsEmitterService {
    private _socket;
    
    constructor(private _logger: Logger,
                _socketService: SocketService) {
        this._socket = _socketService.socket;
    }
    
    public emitAction(action: string, params: any = undefined): void {
        this._logger.log(`Emitting action ${action} with parameters ${JSON.stringify(params)}`);
        this._socket.emit(action, params);
    }   
}
import {Injectable} from 'angular2/core';
import {Logger} from '../logger/logger';
import {SocketService} from '../socket/socket.service';

@Injectable()
export class PlayersService {
    private _socket;
    
    constructor(private _logger:Logger,
                _socketService:SocketService) {
        this._socket = _socketService.socket;
    }
    
    onPlayers(fn:Function) {
        this._logger.log('Adding users listener.');
        this._socket.on('users', data => {
            this._logger.log(`Got users data: ${JSON.stringify(data)}.`);
            fn(data.users);
        });
    }
    
    removeOnPlayers() {
        this._logger.log('Removing users listener.');
        this._socket.removeListener('users');
    }
    
    // onTurn(fn:Function) {
    //     this._logger.log('Adding turns listener.');
    //     this._socket.on('turn', data => {
    //         this._logger.log(`Got turn data: ${JSON.stringify(data)}.`);
    //         fn(data.users);
    //     });
    // }
}
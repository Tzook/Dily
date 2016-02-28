import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {SocketService} from '../socket/socket.service';
import {PlayersComponent} from '../players/players.component';
import {PlayersService} from '../players/players.service';
import {Player} from '../players/player.interface';

@Component({
    selector: 'room',
    template: `
        <div *ngIf="_enabled">
            <players [list]="_players"></players>
        </div>
    `,
    directives: [PlayersComponent],
    providers: [PlayersService],
})
export class RoomComponent implements OnInit, OnDestroy {
    private _enabled:boolean;
    private _players:Player[];
    
    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _socketService:SocketService,
                private _playersService:PlayersService) {
        if (!this._socketService.isConnected) {
            // TODO is there a way to navigate and replace the history?
            _router.navigate(['EnterName', {room: this._routeParams.get('room')}]);
        } else {
            this._players = [];
            this._enabled = true;
        }
    }
    
    ngOnInit() {
        this._playersService.onPlayers(players => this._players = players);
    }
    
    ngOnDestroy() {
        this._socketService.disconnect();
    }
}
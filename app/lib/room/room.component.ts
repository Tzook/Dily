import {Component, OnDestroy} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {SocketService} from '../socket/socket.service';
import {PlayersComponent} from '../players/players.component';

@Component({
    selector: 'room',
    template: `
        <div *ngIf="_enabled">
            <players></players>
            In room.
        </div>
    `,
    directives: [PlayersComponent]
})
export class RoomComponent implements OnDestroy {
    private _enabled:boolean;
    
    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _socketService:SocketService) {
        if (!this._socketService.isConnected) {
            // TODO is there a way to navigate and replace the history?
            _router.navigate(['EnterName', {room: this._routeParams.get('room')}]);
        } else {
            this._enabled = true;
        }
    }
    
    ngOnDestroy() {
        this._socketService.disconnect();
    }
}
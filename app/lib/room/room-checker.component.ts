import {Component, OnDestroy} from 'angular2/core';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common';
import {Router, RouteParams} from 'angular2/router';
import {SocketService} from '../socket/socket.service';
import {EnterNameComponent} from './enter-name.component';
import {RoomComponent} from './room.component';

@Component({
    selector: 'room-checker',
    template: `
        <div [ngSwitch]="_socketService.isConnected">
            <template ngSwitchDefault>
                <enter-name (connect)="connect($event)" [error]="_error"></enter-name>
            </template>
            <template [ngSwitchWhen]="true">
                <room [myId]="_socketService.myId"></room>
            </template>
        </div>
    `,
    directives: [EnterNameComponent, RoomComponent, NgSwitch],
    providers: [],
})
export class RoomCheckerComponent implements OnDestroy {
    private _error:string;
    
    constructor(private _socketService:SocketService,
                private _router:Router,
                private _routeParams:RouteParams) {}
    
    connect(value:string) {
        this._socketService.connect(value, this._routeParams.get('room'))
            .then(room => this._router.navigate(['Room', {room}]))
            .catch(error => this._error = error);
    }
    
    ngOnDestroy() {
        this._socketService.disconnect();
    }
}
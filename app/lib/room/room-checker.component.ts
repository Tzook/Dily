import {Component, OnDestroy} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {MessageService} from '../messages/message.service';
import {SocketService} from '../socket/socket.service';
import {EnterNameComponent} from './enter-name.component';
import {RoomComponent} from './room.component';

@Component({
    selector: 'room-checker',
    template: `
        <div [ngSwitch]="_socketService.isConnected">
            <template ngSwitchDefault>
                <enter-name (connect)="connect($event)"></enter-name>
            </template>
            <template [ngSwitchWhen]="true">
                <room [myId]="_socketService.myId"></room>
            </template>
        </div>
    `,
    directives: [EnterNameComponent, RoomComponent],
})
export class RoomCheckerComponent implements OnDestroy {
    constructor(private _socketService:SocketService,
                private _messageService:MessageService,
                private _router:Router,
                private _routeParams:RouteParams) {}
    
    connect(value:string) {
        this._socketService.connect(value, this._routeParams.get('room'))
            .then(room => this._router.navigate(['Room', {room}]))
            .catch(error => this._messageService.message = {text: error, type: 'error'});
    }
    
    ngOnDestroy() {
        // TODO
        // this._socketService.disconnect();
    }
}
import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {SocketService} from '../socket/socket.service';
import {PlayersComponent} from '../players/players.component';
import {EventsReceiverService} from '../socket/events-receiver.service';
import {EventsEmitterService} from '../socket/events-emitter.service';
import {ActionsComponent} from '../actions/actions.component';

@Component({
    selector: 'room',
    template: `
        <div *ngIf="_enabled">
            <players [list]="_players"></players>
            <actions [state]="_state" [isYourTurn]="_turnId === _socketService.myId" (action)="handleAction($event.action, $event.params)"></actions>
        </div>
    `,
    directives: [PlayersComponent, ActionsComponent],
    providers: [EventsReceiverService, EventsEmitterService],
})
export class RoomComponent implements OnInit, OnDestroy {
    private _enabled:boolean;
    private _players:Object;
    private _state:string;
    private _turnId:string;
    
    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _socketService:SocketService,
                private _eventsReceiverService:EventsReceiverService,
                private _eventsEmitterService:EventsEmitterService) {
        if (!this._socketService.isConnected) {
            // TODO is there a way to navigate and replace the history?
            // OR prevent getting to this page to begin with?
            _router.navigate(['EnterName', {room: this._routeParams.get('room')}]);
        } else {
            this._players = {};
            this._enabled = true;
            this._state = "start";
        }
    }
    
    ngOnInit() {
        this._eventsReceiverService.onPlayers(players => this._players = players);
        this._eventsReceiverService.onTurn(turnId => this._turnId = turnId);
    }
    
    ngOnDestroy() {
        if (this._enabled) {
            this._eventsReceiverService.removeOnPlayers();
            this._eventsReceiverService.removeOnTurn();
            this._socketService.disconnect();
        }
    }
    
    handleAction(action:string, params:Object = undefined) {
        this._eventsEmitterService.emitAction(action, params);
    }
}
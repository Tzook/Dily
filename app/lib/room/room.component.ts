import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {SocketService} from '../socket/socket.service';
import {PlayersComponent} from '../players/players.component';
import {BetComponent} from '../bet/bet.component';
import {EventsReceiverService} from '../socket/events-receiver.service';
import {EventsEmitterService} from '../socket/events-emitter.service';
import {ActionsComponent} from '../actions/actions.component';

@Component({
    selector: 'room',
    template: `
        <div *ngIf="_enabled">
            <players [list]="_players"></players>
            <bet [hidden]="_state !== 'bet'" [count]="_bet.count" [result]="_bet.die"></bet>
            <actions [state]="_state" (action)="handleAction($event.action, $event.params)"></actions>
        </div>
    `,
    directives: [PlayersComponent, BetComponent, ActionsComponent],
    providers: [EventsReceiverService, EventsEmitterService],
})
export class RoomComponent implements OnInit, OnDestroy {
    private _enabled:boolean;
    private _players:Object;
    private _state:string;
    private _turnId:string;
    private _bet:Object;
    
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
            this._bet = {count: 0, die: 0};
        }
    }
    
    ngOnInit() {
        this._eventsReceiverService.onPlayers(players => this._players = players);
        this._eventsReceiverService.onTurn(this.onTurn.bind(this));
        this._eventsReceiverService.onStart(() => this._state = "roll");
        this._eventsReceiverService.onRoll((id, result) => this._players[id].result = result);
        this._eventsReceiverService.onResults(id => this._state = (this._socketService.myId === id ? "next" : "" ));
        this._eventsReceiverService.onLoseDie(id => this._players[id].count--);
    }
    
    ngOnDestroy() {
        if (this._enabled) {
            this._eventsReceiverService.removeOnPlayers();
            this._eventsReceiverService.removeOnTurn();
            this._eventsReceiverService.removeOnStart();
            this._eventsReceiverService.removeOnRoll();
            this._eventsReceiverService.removeOnResults();
            this._eventsReceiverService.removeOnLoseDie();
            this._socketService.disconnect();
        }
    }
    
    private handleAction(action:string, params:Object = undefined) {
        this._eventsEmitterService.emitAction(action, params);
    }
    
    private onTurn(turnId, bet) {
        this._state = "bet";
        this._bet = bet;
        if (this._turnId) {
            this._players[this._turnId].turn = false; 
        }
        this._players[this._turnId = turnId].turn = true; 
    }
}
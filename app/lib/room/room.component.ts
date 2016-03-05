import {Component, Input, OnInit, OnDestroy} from 'angular2/core';
import {PlayerComponent} from '../players/player.component';
import {PlayersComponent} from '../players/players.component';
import {BetComponent} from '../bet/bet.component';
import {EventsReceiverService} from '../socket/events-receiver.service';
import {EventsEmitterService} from '../socket/events-emitter.service';
import {ActionsComponent} from '../actions/actions.component';

@Component({
    selector: 'room',
    template: `
        <players [players]="_players"></players>
        <h1 [hidden]="myId != _turnId || _state != 'bet'">YOUR TURN!</h1>
        <bet [hidden]="_state != 'bet'" [count]="_bet.count" [die]="_bet.die"></bet>
        <actions [state]="_state" [hasBet]="_bet.count > 0" [myTurn]="myId == _turnId" (action)="_handleAction($event.action, $event.params)"></actions>
    `,
    directives: [PlayersComponent, BetComponent, ActionsComponent],
    providers: [EventsReceiverService, EventsEmitterService],
})
export class RoomComponent implements OnInit, OnDestroy {
    @Input() myId: string;
    
    private _players: {[key: string]: PlayerComponent};
    private _state: string;
    private _turnId: string;
    private _bet: BetComponent;
    
    constructor(private _eventsReceiverService: EventsReceiverService,
                private _eventsEmitterService: EventsEmitterService) {
        this._players = {};
        this._state = "start";
        this._bet = {count: 0, die: 0};
    }
    
    ngOnInit() {
        this._eventsReceiverService.onPlayers(players => this._players = players);
        this._eventsReceiverService.onTurn(this._onTurn.bind(this));
        this._eventsReceiverService.onStart(() => this._state = "roll");
        this._eventsReceiverService.onRoll((id, result) => this._players[id].result = result);
        this._eventsReceiverService.onResults(id => this._state = (this.myId === id ? "next" : "" ));
        this._eventsReceiverService.onLoseDie(id => this._players[id].count--);
    }
    
    ngOnDestroy() {
        this._eventsReceiverService.removeOnPlayers();
        this._eventsReceiverService.removeOnTurn();
        this._eventsReceiverService.removeOnStart();
        this._eventsReceiverService.removeOnRoll();
        this._eventsReceiverService.removeOnResults();
        this._eventsReceiverService.removeOnLoseDie();
    }
    
    private _handleAction(action: string, params: Object = undefined) {
        this._eventsEmitterService.emitAction(action, params);
    }
    
    private _onTurn(turnId: string, bet: BetComponent): void {
        this._state = "bet";
        this._bet = bet;
        if (this._turnId) {
            this._players[this._turnId].turn = false; 
        }
        this._players[this._turnId = turnId].turn = true; 
    }
}
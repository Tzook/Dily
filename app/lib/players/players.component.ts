import {Component, OnInit, OnDestroy} from 'angular2/core';
import {PlayersService} from './players.service';
import {PlayerComponent} from './player.component';
import {Player} from './player.interface';

@Component({
    selector: 'players',
    template: `
        <ul class="players">
            <player *ngFor="#player of _players" [name]="player.name"></player>
        </ul>
        Players list.
    `,
    directives: [PlayerComponent],
    providers: [PlayersService],
})
export class PlayersComponent implements OnInit, OnDestroy {
    private _players:Player[];
    constructor(private _playersService:PlayersService) {
        this._players = [];
    }
    
    ngOnInit() {
        this._playersService.onPlayers(players => this._players = players);
        // this._playersService.onTurn(id => {
        //     for (var i in this._players) {
        //         var player = this._players[i];
        //         player.turn = (player.id === id);
        //     }
        // });
    }
    
    ngOnDestroy() {
        this._playersService.removeOnPlayers();
        // this._playersService.removeOnTurn();
    }
}
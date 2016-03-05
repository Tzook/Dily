import {Component, Input} from 'angular2/core';
import {PlayerComponent} from './player.component';

@Component({
    selector: 'players',
    template: `
        <ul class="players">
            <player *ngFor="#player of _getPlayers()" [name]="player.name" [result]="player.result" [turn]="player.turn" [count]="player.count"></player>
        </ul>
    `,
    directives: [PlayerComponent],
})
export class PlayersComponent {
    @Input() players: {[key: string]: PlayerComponent};
    
    private _getPlayers() : PlayerComponent[] {
        return Object.keys(this.players).map(id => this.players[id]);
    }
}
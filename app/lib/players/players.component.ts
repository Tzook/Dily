import {Component, Input} from 'angular2/core';
import {PlayerComponent} from './player.component';

@Component({
    selector: 'players',
    template: `
        <ul class="players">
            <player *ngFor="#player of getPlayers()" [name]="player.name"></player>
        </ul>
    `,
    directives: [PlayerComponent],
})
export class PlayersComponent {
    @Input() list:Object;
    
    getPlayers() : Object[] {
        return Object.keys(this.list).map(item => this.list[item]);
    }
}
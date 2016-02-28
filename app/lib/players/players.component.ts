import {Component, Input} from 'angular2/core';
import {PlayerComponent} from './player.component';
import {Player} from './player.interface';

@Component({
    selector: 'players',
    template: `
        <ul class="players">
            <player *ngFor="#player of list" [name]="player.name"></player>
        </ul>
        Players list.
    `,
    directives: [PlayerComponent],
})
export class PlayersComponent {
    @Input() list:Player;
    
}
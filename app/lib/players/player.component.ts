import {Component, Input} from 'angular2/core';
import {HandComponent} from '../dice/hand.component';

@Component({
    selector: 'player',
    template: `
        <li>
            <span [ngClass]="{'turn': turn}">{{name}}</span>
            <hand [count]="count" [result]="result"></hand>
        </li>
    `,
    directives: [HandComponent],
    providers: [],
})
export class PlayerComponent {
    @Input() name:string;
    @Input() turn:boolean;
    @Input() result:number[];
    @Input() count:number;
}

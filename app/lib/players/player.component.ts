import {Component, Input} from 'angular2/core';
import {HandComponent} from '../dice/hand.component';

@Component({
    selector: 'player',
    template: `
        <li>
            <span [ngClass]="{'turn': _turn}">{{name}}</span>
            <hand [count]="_count"></hand>
        </li>
    `,
    directives: [HandComponent],
    providers: [],
})
export class PlayerComponent {
    @Input() name:string;
    @Input() turn:boolean;
    private _count:number;
    
    constructor() {
        this._count = 5;
    }
}

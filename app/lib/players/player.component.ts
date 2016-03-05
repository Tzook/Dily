import {Component, Input, OnChanges, SimpleChange} from 'angular2/core';
import {HandComponent} from '../dice/hand.component';

@Component({
    selector: 'player',
    template: `
        <li>
            <span [class.turn]="turn">{{name}}</span>
            <hand [count]="count" [result]="result" [roll]="_roll"></hand>
        </li>
    `,
    directives: [HandComponent],
})
export class PlayerComponent implements OnChanges {
    @Input() name: string;
    @Input() turn: boolean;
    @Input() result: number[];
    @Input() count: number;
    
    private _roll: number;
    
    constructor() {
        this._roll = 0;
    }
    
    ngOnChanges(changes: any) {
        let result: SimpleChange = changes.result;
        if (result && result.currentValue !== result.previousValue && !result.isFirstChange()) {
            this._roll++;
        }
    }
}
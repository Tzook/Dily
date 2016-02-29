import {Component, Input} from 'angular2/core';
import {DieComponent} from '../dice/die.component';

@Component({
    selector: 'bet',
    template: `
        <h2>Current bet</h2>
        <h1>{{count}}</h1>
        <die [scale]="1" [result]="result"></die>
    `,
    directives: [DieComponent],
    providers: [],
})
export class BetComponent {
    @Input() count:number;
    @Input() result:number;
}

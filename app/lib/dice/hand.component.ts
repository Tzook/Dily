import {Component, Input} from 'angular2/core';
import {DieComponent} from './die.component';

@Component({
    selector: 'hand',
    template: `
        <die *ngFor="#i of _getArray()" [style.left.px]="i * 50" [scale]="0.5" [result]="result && result[i]" [roll]="roll"></die>
    `,
    directives: [DieComponent],
})
export class HandComponent {
    @Input() count: number;
    @Input() result: number[];
    @Input() roll: number;
    
    // angular 2 can use ngFor only on arrays, so we must convert the object to array
    private _getArray(): number[] {
        // TODO why is it highlighted as bad when we use .from?
        return Array['from'](new Array(this.count), (x, i) => i);
    }
}
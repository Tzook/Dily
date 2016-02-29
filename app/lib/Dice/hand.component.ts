import {Component, Input} from 'angular2/core';
import {DieComponent} from './die.component';

@Component({
    selector: 'hand',
    template: `
        <die *ngFor="#i of getArray()" [style.left.px]="i * 50" [scale]="0.5" [result]="result && result[i]" [roll]="roll"></die>
    `,
    directives: [DieComponent],
    providers: [],
})
export class HandComponent {
    @Input() count:number;
    @Input() result:number[];
    @Input() roll:number;
    
    getArray() : number[] {
        // TODO why is it highlighted as bad when we use .from?
        return Array['from'](new Array(this.count), (x, i) => i);
    }
}

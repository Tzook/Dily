import {Component, Input} from 'angular2/core';
import {DieComponent} from './die.component';

@Component({
    selector: 'hand',
    template: `
        <die *ngFor="#i of getArray()" [style.left.px]="i * 50" [scale]="0.5" [result]="0">A die {{i}}</die>
    `,
    directives: [DieComponent],
    providers: [],
})
export class HandComponent {
    @Input() count:number;
    
    getArray() : number[] {
        // TODO why is it highlighted as bad?
        return Array.from(new Array(this.count), (x, i) => i);
    }
}

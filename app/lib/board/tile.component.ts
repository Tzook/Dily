import { Component, Input, Output, EventEmitter, ContentChild } from 'angular2/core';
import { PieceComponent } from '../pieces/piece.component';

@Component({
    selector: 'tile',
    template: `
       <div class="tile" [style.background-color]="backgroundColor" [ngClass]="{highlighted: highlighted}" (click)="emitClick()">
           <ng-content select="piece"></ng-content>
       </div>
    `,
    styles: [
        `.tile {
            width: 100px;
            height: 100px;
        }
        .highlighted {
            border: 2px solid;
            cursor: pointer;
        }`
    ],
    directives: [],
})
export class TileComponent {
    @Input() backgroundColor: string;
    @Input() highlighted: boolean;
    @Output() tileClicked = new EventEmitter();
    @ContentChild(PieceComponent) piece: PieceComponent;
    
    constructor() {}
    
    public emitClick(): void {
        this.tileClicked.emit({});
    }
}
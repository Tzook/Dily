import { Component, Input, Output, EventEmitter, ContentChild } from 'angular2/core';
import { PieceComponent } from '../pieces/piece.component';

@Component({
    selector: 'tile',
    template: `
       <div class="tile" [ngClass]="{highlighted: highlighted}" (click)="emitClick()">
           <ng-content select="piece"></ng-content>
       </div>
    `,
    styles: [
        `.tile {
            width: 100px;
            height: 100px;
        }
        .highlighted {
            cursor: pointer;
            background-color: rgba(129, 212, 250, 0.5);
        }`
    ],
    directives: [],
})
export class TileComponent {
    @Input() highlighted: boolean;
    @Output() tileClicked = new EventEmitter();
    @ContentChild(PieceComponent) piece: PieceComponent;
    
    constructor() {}
    
    public emitClick(): void {
        this.tileClicked.emit({});
    }
}
import { Component } from 'angular2/core';
import { TileComponent } from './tile.component';

const BOARD_SIZE = 8;

@Component({
    selector: 'board',
    template: `
        <div *ngFor="let i of _rows; let row = index">
            <tile *ngFor="let i of _rows; let col = index" 
                [backgroundColor]="_getBackgroundColor(row, col)"></tile>
        </div>
    `,
    styles: [
        `tile {
            display: inline-block;
        }`
    ],
    directives: [ TileComponent ],
})
export class BoardComponent {
    private _rows;
    constructor() {
        this._rows = new Array(BOARD_SIZE);
    }
    
    
    
    private _getBackgroundColor(row: number, col: number): string {
        return row % 2 === col % 2 ? 'gray' : 'white';
    }
}
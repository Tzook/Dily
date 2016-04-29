import { Component } from 'angular2/core';
import { TileComponent } from './tile.component';
import { PieceComponent } from '../pieces/piece.component';

const BOARD_SIZE = 8;

@Component({
    selector: 'board',
    template: `
        <div *ngFor="let row of _rows">
            <tile *ngFor="let col of row" [backgroundColor]="col.backgroundColor">
                <piece [type]="col.piece" [yours]="col.yours"></piece>
            </tile>
        </div>
    `,
    styles: [
        `tile {
            display: inline-block;
        }`
    ],
    directives: [ TileComponent, PieceComponent ],
})
export class BoardComponent {
    private _rows: Object[][];
    constructor() {
        this._rows = [];
        for (var i: number = 0; i < BOARD_SIZE; i++) {
            this._rows[i] = [];
            for (var j: number = 0; j < BOARD_SIZE; j++) {
                this._rows[i][j] = {
                    backgroundColor: this._getBackgroundColor(i, j),
                    piece: this._getInitialPiece(i, j),
                    yours: this._getIsYours(i),
                };
            }
        }
    }
    
    private _getBackgroundColor(row: number, col: number): string {
        return row % 2 === col % 2 ? 'gray' : 'white';
    }
    
    private _getInitialPiece(row: number, col: number): string {
        let piece = '';
        switch (row) {
            case 1: case 6: 
                piece = 'pawn';
                break;
            case 0: case 7:
                switch (col) {
                    case 0: case 7:
                        piece = 'rock';
                        break;
                    case 1: case 6:
                        piece = 'knight';
                        break;
                    case 2: case 5:
                        piece = 'bishop';
                        break;
                    case 3:
                        piece = 'king';
                        break;
                    case 4:
                        piece = 'queen';
                        break;
                }
        }
        return piece;
    }
    
    private _getIsYours(row: number): boolean {
        return row > 2;
    }
}
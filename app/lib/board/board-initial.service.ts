import {Injectable} from 'angular2/core';
import {Logger} from '../logger/logger';

const BOARD_SIZE = 8;

@Injectable()
export class BoardInitialService {
    
    constructor(private _logger: Logger) {}
    
    public getRows(tiles: any[]): any[][] {
        let rows = [];
        
        for (var i: number = 0; i < BOARD_SIZE; i++) {
            rows[i] = [];
            for (var j: number = 0; j < BOARD_SIZE; j++) {
                let tile = this._getTileFromRowCol(i, j);
                rows[i][j] = tiles[tile] = {
                    tile,
                    piece: this._getInitialPiece(i, j),
                    yours: this._getIsYours(i),
                    white: this._getIsWhite(i),
                    highlighted: false,
                };
            }
        }
        this._logger.log('Rows: ', rows);
        return rows;
    }
    
     private _getTileFromRowCol(row: number, col: number): string {
        let letter = "abcdefgh"[col];
        let num = BOARD_SIZE - row;
        return letter + num;
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
                        piece = 'queen';
                        break;
                    case 4:
                        piece = 'king';
                        break;
                }
        }
        return piece;
    }
    
    private _getIsWhite(row: number): boolean {
        return row > 2;
    }
    
    private _getIsYours(row: number): boolean {
        return row > 2;
    }
}
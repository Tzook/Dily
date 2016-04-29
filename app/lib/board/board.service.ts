import {Injectable} from 'angular2/core';
import {Logger} from '../logger/logger';

const BOARD_SIZE = 8;

@Injectable()
export class BoardService {
    private _game;
    private _rows: any[][];
    private _tiles: any[];
    private _highlightedTiles: string[];
    private _lastClickedTile: string;
    
    constructor(private _logger: Logger, _window: Window) {
        this._game = new _window['Chess']();
        this._highlightedTiles = [];
    }
    
    public getRows(): any[][] {
        this._rows = [];
        this._tiles = [];
        for (var i: number = 0; i < BOARD_SIZE; i++) {
            this._rows[i] = [];
            for (var j: number = 0; j < BOARD_SIZE; j++) {
                let tile = this._getTileFromRowCol(i, j);
                this._rows[i][j] = this._tiles[tile] = {
                    backgroundColor: this._getBackgroundColor(i, j),
                    tile,
                    piece: this._getInitialPiece(i, j),
                    yours: this._getIsYours(i),
                    white: this._getIsWhite(i),
                    highlighted: false,
                };
            }
        }
        this._logger.log('Rows: ', this._rows);
        return this._rows;
    }
    
    public tileClicked(tileObject: any) { // TODO have a tile object interface 
        let isHighlighted = tileObject.highlighted;
        this._clearHighlightedTiles();
        
        if (isHighlighted) {
            if (tileObject.tile !== this._lastClickedTile) {
                // TODO prompt the user on what to get here, if pawn reached promotion
                this._performMove(tileObject.tile);
            }
            this._lastClickedTile = '';
        } else {
            this._showHighlightedMoves(tileObject.tile);
            this._lastClickedTile = tileObject.tile;
        }
        if (this._game.game_over()) {
            console.log('Game over.');
        }
    }
    
    private _performMove(tile: string): void {
        this._logger.log('Moving a piece from ' + this._lastClickedTile + ' to ' + tile);
        let move = this._game.move({from: this._lastClickedTile, to: tile});
        if (move) {
            this._logger.log('Made a move: ', move);
            this._movePiece(move);
            
            if (move.flags === 'n') {
                // TODO handle en passant
            } else if (move.flags === 'k') {
                this._movePiece({from: 'h' + tile[1], to: 'f' + tile[1]})
            } else if (move.flags === 'q') {
                this._movePiece({from: 'a' + tile[1], to: 'd' + tile[1]})
            }
        }
    }
    
    private _movePiece(move: {from: string, to: string}): void {
        this._logger.log('Moving a piece: ', move);
        this._tiles[move.to].piece = this._tiles[move.from].piece; 
        this._tiles[move.to].yours = this._tiles[move.from].yours; 
        this._tiles[move.to].white = this._tiles[move.from].white; 
        this._tiles[move.from].piece = '';
    }
    
    private _showHighlightedMoves(tile: string): void {
        let moves = this._game.moves({square: tile, verbose: true});
        this._logger.log('Available moves: ', moves);
        
        moves.push({to: tile});
        for (let tile of moves) {
            this._highlightedTiles.push(tile.to);
            this._tiles[tile.to].highlighted = true;
        }
    }
    
    private _clearHighlightedTiles(): void {
        for (let tile of this._highlightedTiles) {
            this._tiles[tile].highlighted = false;
        }
    }
    
    private _getTileFromRowCol(row: number, col: number): string {
        let letter = "abcdefgh"[col];
        let num = BOARD_SIZE - row;
        return letter + num;
    }
    
    private _getBackgroundColor(row: number, col: number): string {
        return row % 2 !== col % 2 ? 'gray' : 'white';
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
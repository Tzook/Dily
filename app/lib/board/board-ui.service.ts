import { Injectable } from 'angular2/core';
import { Logger } from '../logger/logger';

@Injectable()
export class BoardUiService {
    private _tiles: any[][];
    private _highlightedTiles: string[];

    constructor(private _logger: Logger) {}

    public setTiles(tiles: any[]): void {
        this._tiles = tiles;
        this._highlightedTiles = [];
    }
    
    public movePiece(move: {from: string, to?: string}): void {
        this._logger.log('Moving a piece: ', move);
        if (move.to) {
            this._tiles[move.to].piece = this._tiles[move.from].piece; 
            this._tiles[move.to].yours = this._tiles[move.from].yours; 
            this._tiles[move.to].white = this._tiles[move.from].white; 
        }
        this._tiles[move.from].piece = '';
    }
    
    public moveSpecialPieceCases(move: {from: string, to: string, flags: string}, tile: string): void {
        if (move.flags === 'e') {
            // en passant
            this.movePiece({from: move.to[0] + move.from[1]});
        } else if (move.flags === 'k') {
            // kingside castle
            this.movePiece({from: 'h' + tile[1], to: 'f' + tile[1]})
        } else if (move.flags === 'q') {
            // queenside castle
            this.movePiece({from: 'a' + tile[1], to: 'd' + tile[1]})
        }
    }
    
    public clearHighlightedTiles(): void {
        for (let tile of this._highlightedTiles) {
            this._tiles[tile].highlighted = false;
            this._logger.log('Unhighlighting tile: ', tile);
        }
        this._highlightedTiles = [];
    }
    
    public showHighlightedMoves(moves: {to: string}[], tile: string): void {
        this._highlightTile(tile);
        for (let tile of moves) {
            this._highlightTile(tile.to);
        }
    }
    
    private _highlightTile(tile: string): void {
        this._logger.log('Highlighting tile: ', tile);
        this._highlightedTiles.push(tile);
        this._tiles[tile].highlighted = true;
    }
}
import { Injectable, Inject } from 'angular2/core';
import { Logger } from '../logger/logger';
import { BoardInitialService } from './board-initial.service';
import { BoardUiService } from './board-ui.service';

@Injectable()
export class BoardService {
    private _game;
    private _lastClickedTile: string;

    constructor(private _boardInitialService: BoardInitialService,
                private _boardUiService: BoardUiService,
                private _logger: Logger,
                private _window: Window) {}
    
    public createGame(): any[][] {
        this._game = new this._window['Chess']();
        this._logger.log("Creating a new Chess game ", this._game);
        let tiles = [];
        this._boardUiService.setTiles(tiles);
        return this._boardInitialService.getRows(tiles);
    }
    
    public tileClicked(tileObject: any): void { // TODO have a tile object interface 
        let isHighlighted = tileObject.highlighted;
        this._boardUiService.clearHighlightedTiles();
        
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
            this._logger.log("Game over.");
        }
    }
    
    private _performMove(tile: string): void {
        this._logger.log('Moving a piece from ' + this._lastClickedTile + ' to ' + tile);
        let move = this._game.move({from: this._lastClickedTile, to: tile});
        if (move) {
            this._boardUiService.movePiece(move);
            this._boardUiService.moveSpecialPieceCases(move, tile);
        }
    }
    
    private _showHighlightedMoves(tile: string): void {
        let moves = this._game.moves({square: tile, verbose: true});
        this._logger.log('Available moves: ', moves);
        
        this._boardUiService.showHighlightedMoves(moves, tile);
    }
}
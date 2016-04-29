System.register(['angular2/core', '../logger/logger'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, logger_1;
    var BOARD_SIZE, BoardService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            }],
        execute: function() {
            BOARD_SIZE = 8;
            BoardService = (function () {
                function BoardService(_logger, _window) {
                    this._logger = _logger;
                    this._game = new _window['Chess']();
                    this._highlightedTiles = [];
                }
                BoardService.prototype.getRows = function () {
                    this._rows = [];
                    this._tiles = [];
                    for (var i = 0; i < BOARD_SIZE; i++) {
                        this._rows[i] = [];
                        for (var j = 0; j < BOARD_SIZE; j++) {
                            var tile = this._getTileFromRowCol(i, j);
                            this._rows[i][j] = this._tiles[tile] = {
                                backgroundColor: this._getBackgroundColor(i, j),
                                tile: tile,
                                piece: this._getInitialPiece(i, j),
                                yours: this._getIsYours(i),
                                white: this._getIsWhite(i),
                                highlighted: false,
                            };
                        }
                    }
                    this._logger.log('Rows: ', this._rows);
                    return this._rows;
                };
                BoardService.prototype.tileClicked = function (tileObject) {
                    var isHighlighted = tileObject.highlighted;
                    this._clearHighlightedTiles();
                    if (isHighlighted) {
                        if (tileObject.tile !== this._lastClickedTile) {
                            // TODO prompt the user on what to get here, if pawn reached promotion
                            this._performMove(tileObject.tile);
                        }
                        this._lastClickedTile = '';
                    }
                    else {
                        this._showHighlightedMoves(tileObject.tile);
                        this._lastClickedTile = tileObject.tile;
                    }
                    if (this._game.game_over()) {
                        console.log('Game over.');
                    }
                };
                BoardService.prototype._performMove = function (tile) {
                    this._logger.log('Moving a piece from ' + this._lastClickedTile + ' to ' + tile);
                    var move = this._game.move({ from: this._lastClickedTile, to: tile });
                    if (move) {
                        this._logger.log('Made a move: ', move);
                        this._movePiece(move);
                        if (move.flags === 'n') {
                        }
                        else if (move.flags === 'k') {
                            this._movePiece({ from: 'h' + tile[1], to: 'f' + tile[1] });
                        }
                        else if (move.flags === 'q') {
                            this._movePiece({ from: 'a' + tile[1], to: 'd' + tile[1] });
                        }
                    }
                };
                BoardService.prototype._movePiece = function (move) {
                    this._logger.log('Moving a piece: ', move);
                    this._tiles[move.to].piece = this._tiles[move.from].piece;
                    this._tiles[move.to].yours = this._tiles[move.from].yours;
                    this._tiles[move.to].white = this._tiles[move.from].white;
                    this._tiles[move.from].piece = '';
                };
                BoardService.prototype._showHighlightedMoves = function (tile) {
                    var moves = this._game.moves({ square: tile, verbose: true });
                    this._logger.log('Available moves: ', moves);
                    moves.push({ to: tile });
                    for (var _i = 0, moves_1 = moves; _i < moves_1.length; _i++) {
                        var tile_1 = moves_1[_i];
                        this._highlightedTiles.push(tile_1.to);
                        this._tiles[tile_1.to].highlighted = true;
                    }
                };
                BoardService.prototype._clearHighlightedTiles = function () {
                    for (var _i = 0, _a = this._highlightedTiles; _i < _a.length; _i++) {
                        var tile = _a[_i];
                        this._tiles[tile].highlighted = false;
                    }
                };
                BoardService.prototype._getTileFromRowCol = function (row, col) {
                    var letter = "abcdefgh"[col];
                    var num = BOARD_SIZE - row;
                    return letter + num;
                };
                BoardService.prototype._getBackgroundColor = function (row, col) {
                    return row % 2 !== col % 2 ? 'gray' : 'white';
                };
                BoardService.prototype._getInitialPiece = function (row, col) {
                    var piece = '';
                    switch (row) {
                        case 1:
                        case 6:
                            piece = 'pawn';
                            break;
                        case 0:
                        case 7:
                            switch (col) {
                                case 0:
                                case 7:
                                    piece = 'rock';
                                    break;
                                case 1:
                                case 6:
                                    piece = 'knight';
                                    break;
                                case 2:
                                case 5:
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
                };
                BoardService.prototype._getIsWhite = function (row) {
                    return row > 2;
                };
                BoardService.prototype._getIsYours = function (row) {
                    return row > 2;
                };
                BoardService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [logger_1.Logger, Window])
                ], BoardService);
                return BoardService;
            }());
            exports_1("BoardService", BoardService);
        }
    }
});
//# sourceMappingURL=board.service.js.map
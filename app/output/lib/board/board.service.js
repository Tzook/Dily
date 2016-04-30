System.register(['angular2/core', '../logger/logger', './board-initial.service', './board-ui.service'], function(exports_1, context_1) {
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
    var core_1, logger_1, board_initial_service_1, board_ui_service_1;
    var BoardService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            },
            function (board_initial_service_1_1) {
                board_initial_service_1 = board_initial_service_1_1;
            },
            function (board_ui_service_1_1) {
                board_ui_service_1 = board_ui_service_1_1;
            }],
        execute: function() {
            BoardService = (function () {
                function BoardService(_boardInitialService, _boardUiService, _logger, _window) {
                    this._boardInitialService = _boardInitialService;
                    this._boardUiService = _boardUiService;
                    this._logger = _logger;
                    this._window = _window;
                }
                BoardService.prototype.createGame = function () {
                    this._game = new this._window['Chess']();
                    this._logger.log("Creating a new Chess game ", this._game);
                    var tiles = [];
                    this._boardUiService.setTiles(tiles);
                    return this._boardInitialService.getRows(tiles);
                };
                BoardService.prototype.tileClicked = function (tileObject) {
                    var isHighlighted = tileObject.highlighted;
                    this._boardUiService.clearHighlightedTiles();
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
                        this._logger.log("Game over.");
                    }
                };
                BoardService.prototype._performMove = function (tile) {
                    this._logger.log('Moving a piece from ' + this._lastClickedTile + ' to ' + tile);
                    var move = this._game.move({ from: this._lastClickedTile, to: tile });
                    if (move) {
                        this._boardUiService.movePiece(move);
                        this._boardUiService.moveSpecialPieceCases(move, tile);
                    }
                };
                BoardService.prototype._showHighlightedMoves = function (tile) {
                    var moves = this._game.moves({ square: tile, verbose: true });
                    this._logger.log('Available moves: ', moves);
                    this._boardUiService.showHighlightedMoves(moves, tile);
                };
                BoardService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [board_initial_service_1.BoardInitialService, board_ui_service_1.BoardUiService, logger_1.Logger, Window])
                ], BoardService);
                return BoardService;
            }());
            exports_1("BoardService", BoardService);
        }
    }
});
//# sourceMappingURL=board.service.js.map
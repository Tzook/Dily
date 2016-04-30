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
    var BoardUiService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            }],
        execute: function() {
            BoardUiService = (function () {
                function BoardUiService(_logger) {
                    this._logger = _logger;
                }
                BoardUiService.prototype.setTiles = function (tiles) {
                    this._tiles = tiles;
                    this._highlightedTiles = [];
                };
                BoardUiService.prototype.movePiece = function (move) {
                    this._logger.log('Moving a piece: ', move);
                    if (move.to) {
                        this._tiles[move.to].piece = this._tiles[move.from].piece;
                        this._tiles[move.to].yours = this._tiles[move.from].yours;
                        this._tiles[move.to].white = this._tiles[move.from].white;
                    }
                    this._tiles[move.from].piece = '';
                };
                BoardUiService.prototype.moveSpecialPieceCases = function (move, tile) {
                    if (move.flags === 'e') {
                        // en passant
                        this.movePiece({ from: move.to[0] + move.from[1] });
                    }
                    else if (move.flags === 'k') {
                        // kingside castle
                        this.movePiece({ from: 'h' + tile[1], to: 'f' + tile[1] });
                    }
                    else if (move.flags === 'q') {
                        // queenside castle
                        this.movePiece({ from: 'a' + tile[1], to: 'd' + tile[1] });
                    }
                };
                BoardUiService.prototype.clearHighlightedTiles = function () {
                    for (var _i = 0, _a = this._highlightedTiles; _i < _a.length; _i++) {
                        var tile = _a[_i];
                        this._tiles[tile].highlighted = false;
                        this._logger.log('Unhighlighting tile: ', tile);
                    }
                    this._highlightedTiles = [];
                };
                BoardUiService.prototype.showHighlightedMoves = function (moves, tile) {
                    this._highlightTile(tile);
                    for (var _i = 0, moves_1 = moves; _i < moves_1.length; _i++) {
                        var tile_1 = moves_1[_i];
                        this._highlightTile(tile_1.to);
                    }
                };
                BoardUiService.prototype._highlightTile = function (tile) {
                    this._logger.log('Highlighting tile: ', tile);
                    this._highlightedTiles.push(tile);
                    this._tiles[tile].highlighted = true;
                };
                BoardUiService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [logger_1.Logger])
                ], BoardUiService);
                return BoardUiService;
            }());
            exports_1("BoardUiService", BoardUiService);
        }
    }
});
//# sourceMappingURL=board-ui.service.js.map
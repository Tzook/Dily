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
    var BOARD_SIZE, BoardInitialService;
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
            BoardInitialService = (function () {
                function BoardInitialService(_logger) {
                    this._logger = _logger;
                }
                BoardInitialService.prototype.getRows = function (tiles) {
                    var rows = [];
                    for (var i = 0; i < BOARD_SIZE; i++) {
                        rows[i] = [];
                        for (var j = 0; j < BOARD_SIZE; j++) {
                            var tile = this._getTileFromRowCol(i, j);
                            rows[i][j] = tiles[tile] = {
                                tile: tile,
                                piece: this._getInitialPiece(i, j),
                                yours: this._getIsYours(i),
                                white: this._getIsWhite(i),
                                highlighted: false,
                            };
                        }
                    }
                    this._logger.log('Rows: ', rows);
                    return rows;
                };
                BoardInitialService.prototype._getTileFromRowCol = function (row, col) {
                    var letter = "abcdefgh"[col];
                    var num = BOARD_SIZE - row;
                    return letter + num;
                };
                BoardInitialService.prototype._getInitialPiece = function (row, col) {
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
                BoardInitialService.prototype._getIsWhite = function (row) {
                    return row > 2;
                };
                BoardInitialService.prototype._getIsYours = function (row) {
                    return row > 2;
                };
                BoardInitialService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [logger_1.Logger])
                ], BoardInitialService);
                return BoardInitialService;
            }());
            exports_1("BoardInitialService", BoardInitialService);
        }
    }
});
//# sourceMappingURL=board-initial.service.js.map
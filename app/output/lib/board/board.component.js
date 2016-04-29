System.register(['angular2/core', './tile.component', '../pieces/piece.component'], function(exports_1, context_1) {
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
    var core_1, tile_component_1, piece_component_1;
    var BOARD_SIZE, BoardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tile_component_1_1) {
                tile_component_1 = tile_component_1_1;
            },
            function (piece_component_1_1) {
                piece_component_1 = piece_component_1_1;
            }],
        execute: function() {
            BOARD_SIZE = 8;
            BoardComponent = (function () {
                function BoardComponent() {
                    this._rows = [];
                    for (var i = 0; i < BOARD_SIZE; i++) {
                        this._rows[i] = [];
                        for (var j = 0; j < BOARD_SIZE; j++) {
                            this._rows[i][j] = {
                                backgroundColor: this._getBackgroundColor(i, j),
                                piece: 'pawn',
                                yours: true,
                            };
                        }
                    }
                }
                BoardComponent.prototype._getBackgroundColor = function (row, col) {
                    return row % 2 === col % 2 ? 'gray' : 'white';
                };
                BoardComponent = __decorate([
                    core_1.Component({
                        selector: 'board',
                        template: "\n        <div *ngFor=\"let row of _rows\">\n            <tile *ngFor=\"let col of row\" [backgroundColor]=\"col.backgroundColor\">\n                <piece [type]=\"col.piece\" [yours]=\"col.yours\"></piece>\n            </tile>\n        </div>\n    ",
                        styles: [
                            "tile {\n            display: inline-block;\n        }"
                        ],
                        directives: [tile_component_1.TileComponent, piece_component_1.PieceComponent],
                    }), 
                    __metadata('design:paramtypes', [])
                ], BoardComponent);
                return BoardComponent;
            }());
            exports_1("BoardComponent", BoardComponent);
        }
    }
});
//# sourceMappingURL=board.component.js.map
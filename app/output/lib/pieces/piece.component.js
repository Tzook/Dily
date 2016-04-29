System.register(['angular2/core', './pawn.component', './knight.component', './bishop.component', './rock.component', './queen.component', './king.component'], function(exports_1, context_1) {
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
    var core_1, pawn_component_1, knight_component_1, bishop_component_1, rock_component_1, queen_component_1, king_component_1;
    var PIECE_TYPES, PieceComponent;
    function getPiecesTemplate() {
        var template = '<span [ngSwitch]="type" class="piece">';
        for (var _i = 0, PIECE_TYPES_1 = PIECE_TYPES; _i < PIECE_TYPES_1.length; _i++) {
            var piece = PIECE_TYPES_1[_i];
            template += "\n            <template ngSwitchWhen=\"" + piece + "\">\n                <" + piece + "-piece [yours]=\"yours\"></" + piece + "-piece>\n            </template>\n        ";
        }
        template += '</span>';
        return template;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (pawn_component_1_1) {
                pawn_component_1 = pawn_component_1_1;
            },
            function (knight_component_1_1) {
                knight_component_1 = knight_component_1_1;
            },
            function (bishop_component_1_1) {
                bishop_component_1 = bishop_component_1_1;
            },
            function (rock_component_1_1) {
                rock_component_1 = rock_component_1_1;
            },
            function (queen_component_1_1) {
                queen_component_1 = queen_component_1_1;
            },
            function (king_component_1_1) {
                king_component_1 = king_component_1_1;
            }],
        execute: function() {
            PIECE_TYPES = ['pawn', 'knight', 'bishop', 'rock', 'queen', 'king'];
            PieceComponent = (function () {
                function PieceComponent() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], PieceComponent.prototype, "type", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], PieceComponent.prototype, "yours", void 0);
                PieceComponent = __decorate([
                    core_1.Component({
                        selector: 'piece',
                        template: getPiecesTemplate(),
                        styles: [
                            ".piece {\n            font-size: 64px;\n            vertical-align: text-top;\n            cursor: pointer;\n        }"
                        ],
                        directives: [pawn_component_1.PawnComponent, knight_component_1.KnightComponent, bishop_component_1.BishopComponent, rock_component_1.RockComponent, queen_component_1.QueenComponent, king_component_1.KingComponent],
                    }), 
                    __metadata('design:paramtypes', [])
                ], PieceComponent);
                return PieceComponent;
            }());
            exports_1("PieceComponent", PieceComponent);
        }
    }
});
//# sourceMappingURL=piece.component.js.map
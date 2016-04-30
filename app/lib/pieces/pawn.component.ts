import { Component } from 'angular2/core';
import { PieceBase } from './piece.base';

@Component({
    selector: 'pawn-piece',
    template: PieceBase.getTemplate('&#9817;', '&#9823;'),
    directives: [],
})
export class PawnComponent extends PieceBase {
}
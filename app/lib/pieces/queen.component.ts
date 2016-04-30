import { Component } from 'angular2/core';
import { PieceBase } from './piece.base';

@Component({
    selector: 'queen-piece',
    template: PieceBase.getTemplate('&#9813;', '&#9819;'),
    directives: [],
})
export class QueenComponent extends PieceBase {
}
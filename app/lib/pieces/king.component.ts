import { Component } from 'angular2/core';
import { PieceBase } from './piece.base';

@Component({
    selector: 'king-piece',
    template: PieceBase.getTemplate('&#9812;', '&#9818;'),
    directives: [],
})
export class KingComponent extends PieceBase {
}
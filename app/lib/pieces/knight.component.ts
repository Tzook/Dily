import { Component } from 'angular2/core';
import { PieceBase } from './piece.base';

@Component({
    selector: 'knight-piece',
    template: PieceBase.getTemplate('&#9816;', '&#9822;'),
    directives: [],
})
export class KnightComponent extends PieceBase {
}
import { Component } from 'angular2/core';
import { PieceBase } from './piece.base';

@Component({
    selector: 'rock-piece',
    template: PieceBase.getTemplate('&#9814;', '&#9820;'),
    directives: [],
})
export class RockComponent extends PieceBase {
}
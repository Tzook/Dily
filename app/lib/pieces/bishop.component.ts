import { Component } from 'angular2/core';
import { PieceBase } from './piece.base';

@Component({
    selector: 'bishop-piece',
    template: PieceBase.getTemplate('&#9815;', '&#9821;'),
    directives: [],
})
export class BishopComponent extends PieceBase {
}
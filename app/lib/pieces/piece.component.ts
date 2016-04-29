import { Component, Input } from 'angular2/core';

const PIECE_TYPES = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];

@Component({
    selector: 'piece',
    template: getPiecesTemplate(),
    directives: [],
})
export class PieceComponent {
    @Input() type: string;
    @Input() yours: boolean;
    
    constructor() {
    }
}

function getPiecesTemplate(): string {
    let template = '<span [ngSwitch]="type">';
    for (let piece of PIECE_TYPES) {
        template += `
            <template ngSwitchWhen="${piece}">
                <${piece}-piece [yours]="yours"></${piece}-piece>
            </template>
        `;
    }
    template += '</span>';
    return template;
}
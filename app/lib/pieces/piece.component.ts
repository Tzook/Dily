import { Component, Input, ViewChild } from 'angular2/core';
import { PawnComponent } from './pawn.component';
import { KnightComponent } from './knight.component';
import { BishopComponent } from './bishop.component';
import { RockComponent } from './rock.component';
import { QueenComponent } from './queen.component';
import { KingComponent } from './king.component';

const PIECE_TYPES = ['pawn', 'knight', 'bishop', 'rock', 'queen', 'king'];

@Component({
    selector: 'piece',
    template: getPiecesTemplate(),
    styles: [
        `.piece {
            font-size: 64px;
            vertical-align: text-top;
            cursor: pointer;
        }`
    ],
    directives: [ PawnComponent, KnightComponent, BishopComponent, RockComponent, QueenComponent, KingComponent ],
})
export class PieceComponent {
    @Input() type: string;
    @Input() yours: boolean;
    @Input() white: boolean;
    
    constructor() {
    }
}

function getPiecesTemplate(): string {
    let template = '<span [ngSwitch]="type" class="piece">';
    for (let piece of PIECE_TYPES) {
        template += `
            <template ngSwitchWhen="${piece}">
                <${piece}-piece [yours]="yours" [white]="white"></${piece}-piece>
            </template>
        `;
    }
    template += '</span>';
    return template;
}
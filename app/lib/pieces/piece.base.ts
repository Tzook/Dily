import { Input, Output, EventEmitter } from 'angular2/core';

export abstract class PieceBase {
    @Input() yours: boolean;
    @Input() white: boolean;
    
    static getTemplate(whiteValue: string, blackValue: string): string {
        return `
            <span>
                <span *ngIf="white">${whiteValue}</span>
                <span *ngIf="!white">${blackValue}</span>
            </span>
        `;
    }
}
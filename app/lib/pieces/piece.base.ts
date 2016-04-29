import { Input } from 'angular2/core';

export abstract class PieceBase {
    @Input() yours: boolean;
   
    static getTemplate(yoursValue: string, otherValue: string): string {
        return `
            <span *ngIf="yours">${yoursValue}</span>
            <span *ngIf="!yours">${otherValue}</span>
        `;
    } 
}
import {Component, Output, EventEmitter} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    selector: 'action-start',
    template: `
        <button (click)="_emitStart()">start</button>
        <button [routerLink]="['Lobby']">exit</button>
    `,
    directives: [RouterLink],
})
export class ActionStartComponent {
    @Output() start = new EventEmitter();

    private _emitStart(): void {
        this.start.emit({});
    }
}
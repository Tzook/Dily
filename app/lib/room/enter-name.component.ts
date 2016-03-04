import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'enter-name',
    template: `
        <h2>Enter your name</h2>
        <input #name (keyup.enter)="emitConnect(name.value)" type="text" placeholder="Name">
        <button (click)="emitConnect(name.value)">Connect</button>
        <button [routerLink]="['Lobby']">Back to lobby</button>
    `,
    providers: [],
    directives: [ROUTER_DIRECTIVES],

})
export class EnterNameComponent {
    @Output() connect = new EventEmitter();
    
    emitConnect(name:string) {
        this.connect.emit(name);
    }
}
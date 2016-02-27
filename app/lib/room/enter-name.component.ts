import {Component} from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {NameValidator} from '../validators/name.validator';
import {SocketService} from '../socket/socket.service';

@Component({
    selector: 'enter-name',
    template: `
        <h2>Enter your name</h2>
        <input #name (keyup)="_error = ''" (keyup.enter)="!isNameInvalid(name.value) && connect(name.value)" type="text" placeholder="Name">
        <button [disabled]="_loading || isNameInvalid(name.value)" (click)="connect(name.value)">Connect</button>
        <button [routerLink]="['Lobby']">Back to lobby</button>
        <p [hidden]="!_error">{{_error}}</p>
    `,
    providers: [NameValidator],
    directives: [ROUTER_DIRECTIVES],

})
export class EnterNameComponent {
    private _error:string;
    private _loading:boolean;
    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _nameValidator:NameValidator,
                private _socketService:SocketService) {
        this._error = '';
    }
    
    isNameInvalid(name:string) : boolean {
        return !this._nameValidator.isValid(name);
    }
    
    connect(value:string) {
        this._loading = true;
        this._socketService.connect(value, this._routeParams.get('room'))
            .then(room => {
                this._router.navigate(['Room', {room}]);
            })
            .catch(error => {
                this._loading = false;
                this._error = error; 
            });
    }
}
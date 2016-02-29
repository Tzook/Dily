import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
    selector: 'lobby',
    template: `
        <h1>~Dily~</h1>
        <button (click)="joinRoom(0)">Create room</button>
        <p>OR</p>
        <input #room type="number" placeholder="Room" max="100000" min="1" required>
        <button (click)="joinRoom(room.value)">Join room</button>
    `,
    providers: [],
})
export class LobbyComponent { 
    constructor(private _router:Router) {}
    
    joinRoom(room:string) {
        this._router.navigate(['Room', {room}]);
    }
}
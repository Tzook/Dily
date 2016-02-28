import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {RoomValidator} from './room.validator';

@Component({
    selector: 'lobby',
    template: `
        <h1>~Dily~</h1>
        <button (click)="joinRoom(0)">Create room</button>
        <p>OR</p>
        <input #room (keyup)="0" type="number" placeholder="Room" max="100000" min="1" required>
        <button [disabled]="isRoomInvalid(room.value)" (click)="joinRoom(room.value)">Join room</button>
    `,
    providers: [RoomValidator],
})
export class LobbyComponent { 
    constructor(private _router:Router,
                private _roomValidator:RoomValidator) {}
    
    isRoomInvalid(roomNumber:string) : boolean {
        return !this._roomValidator.isValid(roomNumber);
    }
    
    joinRoom(room:string) {
        this._router.navigate(['EnterName', {room}]);
    }
}
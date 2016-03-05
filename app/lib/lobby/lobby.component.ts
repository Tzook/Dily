import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {DieComponent} from '../dice/die.component';

@Component({
    selector: 'lobby',
    template: `
        <h1>~Dily~</h1>
        <div class="lobby-die">
            <die scale="1.0" [result]="_result" [roll]="_roll" (click)="_changeResult()"></die>
        </div>
        <button (click)="_joinRoom(0)">Create room</button>
        <p>OR</p>
        <input #room type="number" placeholder="Room" max="100000" min="1" required>
        <button (click)="_joinRoom(room.value)">Join room</button>
    `,
    directives: [DieComponent],
})
export class LobbyComponent {
    private _result: number;
    private _roll: number;
    
    constructor(private _router: Router) {
        this._result = 6;
        this._roll = 0;
    }
    
    private _joinRoom(room: string) {
        this._router.navigate(['Room', {room}]);
    }
    
    private _changeResult() {
        this._result = Math.floor(Math.random() * 6) + 1;
        this._roll++;
    }
}
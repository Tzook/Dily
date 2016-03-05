import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {DieComponent} from '../dice/die.component';

@Component({
    selector: 'lobby',
    template: `
        <h1>~Dily~</h1>
        <div class="lobby-die">
            <die scale="1.0" [result]="_result" [roll]="_roll" (click)="changeResult()"></die>
        </div>
        <button (click)="joinRoom(0)">Create room</button>
        <p>OR</p>
        <input #room type="number" placeholder="Room" max="100000" min="1" required>
        <button (click)="joinRoom(room.value)">Join room</button>
    `,
    directives: [DieComponent],
    providers: [],
})
export class LobbyComponent {
    private _result:number;
    private _roll:number;
    constructor(private _router:Router) {
        this._result = 6;
        this._roll = 0;
    }
    
    joinRoom(room:string) {
        this._router.navigate(['Room', {room}]);
    }
    
    changeResult() {
        this._result = Math.floor(Math.random() * 6) + 1;
        this._roll++;
    }
}
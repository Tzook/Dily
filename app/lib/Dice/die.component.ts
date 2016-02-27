import {Component, Input} from 'angular2/core';
import {FaceComponent} from './face.component';

const FACES = [
    {class: "six",   locations: ["t-l", "t-r", "m-l", "m-r", "b-l", "b-r"]},
    {class: "one",   locations: ["m-m"]},
    {class: "three", locations: ["t-l", "m-m", "b-r"]},
    {class: "four",  locations: ["t-l", "t-r", "b-l", "b-r"]},
    {class: "two",   locations: ["b-l", "t-r"]},
    {class: "five",  locations: ["t-l", "t-r", "m-m", "b-l", "b-r"]}
];
const INITIAL_TILT = { x: 30, z: 20 };

@Component({
    selector: 'die',
    template: `
        <div class="layer" [style.transform]="'scale(' + scale + ')'">
            <div class="layer" [style.transform]="_tilt">
                <div [class]="'layer' + (_roll ? ' roll' : '')" [style.animation-duration]="_flipTime">
                    <div [class]="'layer result-' + result">
                        <face *ngFor="#face of _faces" [class]="face.class" [locations]="face.locations"></face>
                    </div>
                </div>
            </div>
        </div>
    `,
    directives: [FaceComponent],
    providers: [],
})
export class DieComponent {
    @Input() scale:number;
    @Input() result:number;
    private _faces:any[];
    private _tilt:string;
    private _roll:boolean;
    private _flipTime:string;
    
    constructor() {
        this._faces = FACES;
        this._tilt = `rotateX(${INITIAL_TILT.x}deg) rotateZ(${INITIAL_TILT.z}deg)`;
        this._roll = false;
    }
    
    roll() {
        // tilt
        this._roll = false;
        setTimeout(() => {
            var tiltZ = getRandomNumber(0, 360);
            var tiltX = getRandomNumber(20, 35);
            this._tilt = `rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`;
            
            // flip time
            this._flipTime = (3 + Math.random() * 4) + 's';
            this._roll = true;
        }, 10);
    }
}

// TODO move this somewhere generic
function getRandomNumber(start, end) {
    return (Math.random() * (end - start + 1) + start) | 0;
}
import {Component, Input, OnChanges, SimpleChange} from 'angular2/core';
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
                <div class="layer" [class.roll]="_rolling" [style.animation-duration]="_flipTime">
                    <div [class]="'layer result-' + (result || 0)">
                        <face *ngFor="#face of _faces" [class]="face.class" [locations]="face.locations"></face>
                    </div>
                </div>
            </div>
        </div>
    `,
    directives: [FaceComponent],
})
export class DieComponent implements OnChanges {
    @Input() scale: number;
    @Input() result: number;
    @Input() roll: number;
    
    private _faces: any[] = FACES;
    private _tilt: string = `rotateX(${INITIAL_TILT.x}deg) rotateZ(${INITIAL_TILT.z}deg)`;
    private _rolling: boolean = false;
    private _flipTime: string;
    
    ngOnChanges(changes: any) {
        let roll:SimpleChange = changes.roll;
        if (roll && roll.currentValue !== roll.previousValue && !roll.isFirstChange()) {
            this._beginRoll();
        }
    }
    
    private _beginRoll(): void {
        this._rolling = false;
        // TODO handle this using angular 2 animation builder
        setTimeout(() => {
            // tilt
            var tiltZ = getRandomNumber(0, 360);
            var tiltX = getRandomNumber(20, 35);
            this._tilt = `rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`;
            
            // flip time
            this._flipTime = (3 + Math.random() * 4) + 's';
            this._rolling = true;
        }, 10);
    }
}

// TODO move this somewhere generic
function getRandomNumber(start: number, end: number): number {
    return (Math.random() * (end - start + 1) + start) | 0;
}
import {Component, Input} from 'angular2/core';

@Component({
    selector: 'face',
    template: `
        <span class="dot" *ngFor="#location of locations" [ngClass]="location"></span>
    `,
    directives: [],
})
export class FaceComponent {
    @Input() locations: string[];
}
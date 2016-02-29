import {Component, Input} from 'angular2/core';

@Component({
    selector: 'face',
    template: `
        <dot *ngFor="#location of locations" [class]="location"></dot>
    `,
    directives: [],
    providers: [],
})
export class FaceComponent {
    @Input() locations:string[];
}
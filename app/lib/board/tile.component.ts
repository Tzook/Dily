import { Component, Input } from 'angular2/core';

@Component({
    selector: 'tile',
    template: `
       <div class="tile" [style.background-color]="backgroundColor">
       </div>
    `,
    styles: [
        `.tile {
            width: 100px;
            height: 100px;
        }`
    ],
    directives: [],
})
export class TileComponent {
    @Input() backgroundColor;
    
    constructor() {
        
    }
}
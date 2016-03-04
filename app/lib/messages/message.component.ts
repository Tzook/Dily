import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {CollapseDirective} from '../collapse/collapse.directive';

@Component({
    selector: 'message',
    template: `
        <div [collapsed]="!visible" (animationStable)="emitIfCollapsed($event.collapsed)">{{text}}</div>
    `,
    directives: [CollapseDirective],
})
export class MessageComponent {
    @Input() visible:string;
    @Input() text:string;
    @Input() type;
    @Output() messageGone = new EventEmitter();
    
    emitIfCollapsed(collapsed:boolean) {
        if (collapsed) {
            this.messageGone.emit({});
        }
    }  
}
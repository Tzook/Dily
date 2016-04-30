import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {CollapseDirective} from '../collapse/collapse.directive';

@Component({
    selector: 'message',
    template: `
        <div [collapsed]="!visible" (animationStable)="_emitIfCollapsed($event.collapsed)">{{text}}</div>
    `,
    directives: [CollapseDirective],
})
export class MessageComponent {
    @Input() visible: string;
    @Input() text: string;
    @Input() type: string;
    @Output() messageGone = new EventEmitter();
    
    private _emitIfCollapsed(collapsed: boolean): void {
        if (collapsed) {
            this.messageGone.emit({});
        }
    }  
}

export interface Message {
    text?: string, 
    type?: string,
}
import {Component} from 'angular2/core';
import {MessageComponent} from './message.component';
import {MessageService} from './message.service';

const MESSAGE_TIME = 3500;

@Component({
    selector: 'message-handler',
    template: `
        <message (messageGone)="_messageService.showNextPendingMessage()" [visible]="_visible" [text]="_text" [type]="_type"></message>
    `,
    directives: [MessageComponent],
})
export class MessageHandlerComponent {
    private _visible:boolean;
    private _text:string;
    private _type:string;
    
    constructor(private _messageService: MessageService) {
        this._visible = false;
        this._messageService.functionHandler = this.showMessage.bind(this);
    }
    
    showMessage(message) {
        this._text = message.text;
        this._type = message.type;
        setTimeout(() => {
            this._visible = false;
        }, MESSAGE_TIME);
        setTimeout(() => {
            this._visible = true;
        });
    }
}
import {Component} from 'angular2/core';
import {Message, MessageComponent} from './message.component';
import {MessageService} from './message.service';

const MESSAGE_TIME = 3500;

@Component({
    selector: 'message-handler',
    template: `
        <message (messageGone)="_messageService.showNextPendingMessage()" [visible]="_visible" [text]="_message.text" [type]="_message.type"></message>
    `,
    directives: [MessageComponent],
})
export class MessageHandlerComponent {
    private _visible: boolean;
    private _message: Message;
    
    constructor(private _messageService: MessageService) {
        this._visible = false;
        this._message = {};
        this._messageService.functionHandler = this._showMessage.bind(this);
    }
    
    private _showMessage(message: Message): void {
        this._message = message;
        setTimeout(() => {
            this._visible = false;
        }, MESSAGE_TIME);
        setTimeout(() => {
            this._visible = true;
        });
    }
}
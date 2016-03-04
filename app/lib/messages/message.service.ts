import {Injectable} from 'angular2/core';
import {Logger} from '../logger/logger';

const MAX_MESSAGES_STACK = 3;

@Injectable()
export class MessageService {
    private _functionHandler:Function;
    private _hasMessage:boolean;
    private _pendingMessages;

    constructor(private _logger: Logger) {
        this._functionHandler = function() {};
        this._hasMessage = false;
        this._pendingMessages = [];
    }
    
    set functionHandler(fn:Function) {
        this._functionHandler = fn;
    }
    
    set message (message) {
        this._logger.log(`Setting message`, message);
        this._functionHandler(message);
        if (!this._hasMessage) {
            this._logger.log(`There are no messages on the screen - showing the message.`);
            this._hasMessage = true;
            this._functionHandler(message);
        } else {
            this._logger.log(`There is a message at the moment. pushing to queue.`);
            this._pendingMessages.push(message);
            // we want to show only recent messages, if the stack is growing we throw old ones
            if (this._pendingMessages.length > MAX_MESSAGES_STACK) {
                this._logger.log(`Message queue is ${this._pendingMessages.length} which is larger than ${MAX_MESSAGES_STACK}. removing oldest message`);
                this._pendingMessages.shift();
            }
        }
    }
    
    showNextPendingMessage() {
        if (this._pendingMessages.length > 0) {
            this._logger.log(`Handling next message in queue. Messages left: ${this._pendingMessages.length - 1}`);
            this._functionHandler(this._pendingMessages.shift());
        } else {
            this._logger.log(`No more pending messages`);
            this._hasMessage = false;        
        }
    }
}
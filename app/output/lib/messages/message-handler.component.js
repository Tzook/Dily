System.register(['angular2/core', './message.component', './message.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, message_component_1, message_service_1;
    var MESSAGE_TIME, MessageHandlerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (message_component_1_1) {
                message_component_1 = message_component_1_1;
            },
            function (message_service_1_1) {
                message_service_1 = message_service_1_1;
            }],
        execute: function() {
            MESSAGE_TIME = 3500;
            MessageHandlerComponent = (function () {
                function MessageHandlerComponent(_messageService) {
                    this._messageService = _messageService;
                    this._visible = false;
                    this._message = {};
                    this._messageService.functionHandler = this._showMessage.bind(this);
                }
                MessageHandlerComponent.prototype._showMessage = function (message) {
                    var _this = this;
                    this._message = message;
                    setTimeout(function () {
                        _this._visible = false;
                    }, MESSAGE_TIME);
                    setTimeout(function () {
                        _this._visible = true;
                    });
                };
                MessageHandlerComponent = __decorate([
                    core_1.Component({
                        selector: 'message-handler',
                        template: "\n        <message (messageGone)=\"_messageService.showNextPendingMessage()\" [visible]=\"_visible\" [text]=\"_message.text\" [type]=\"_message.type\"></message>\n    ",
                        directives: [message_component_1.MessageComponent],
                    }), 
                    __metadata('design:paramtypes', [message_service_1.MessageService])
                ], MessageHandlerComponent);
                return MessageHandlerComponent;
            }());
            exports_1("MessageHandlerComponent", MessageHandlerComponent);
        }
    }
});
//# sourceMappingURL=message-handler.component.js.map
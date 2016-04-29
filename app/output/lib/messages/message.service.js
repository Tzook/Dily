System.register(['angular2/core', '../logger/logger'], function(exports_1, context_1) {
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
    var core_1, logger_1;
    var MAX_MESSAGES_STACK, MessageService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            }],
        execute: function() {
            MAX_MESSAGES_STACK = 3;
            MessageService = (function () {
                function MessageService(_logger) {
                    this._logger = _logger;
                    this._functionHandler = function () { };
                    this._pendingMessages = [];
                    this._hasMessage = false;
                }
                Object.defineProperty(MessageService.prototype, "functionHandler", {
                    set: function (fn) {
                        this._functionHandler = fn;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MessageService.prototype, "message", {
                    set: function (message) {
                        this._logger.log("Setting message", message);
                        this._functionHandler(message);
                        if (!this._hasMessage) {
                            this._logger.log("There are no messages on the screen - showing the message.");
                            this._hasMessage = true;
                            this._functionHandler(message);
                        }
                        else {
                            this._logger.log("There is a message at the moment. pushing to queue.");
                            this._pendingMessages.push(message);
                            // we want to show only recent messages, if the stack is growing we throw old ones
                            if (this._pendingMessages.length > MAX_MESSAGES_STACK) {
                                this._logger.log("Message queue is " + this._pendingMessages.length + " which is larger than " + MAX_MESSAGES_STACK + ". removing oldest message");
                                this._pendingMessages.shift();
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                MessageService.prototype.showNextPendingMessage = function () {
                    if (this._pendingMessages.length > 0) {
                        this._logger.log("Handling next message in queue. Messages left: " + (this._pendingMessages.length - 1));
                        this._functionHandler(this._pendingMessages.shift());
                    }
                    else {
                        this._logger.log("No more pending messages");
                        this._hasMessage = false;
                    }
                };
                MessageService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof logger_1.Logger !== 'undefined' && logger_1.Logger) === 'function' && _a) || Object])
                ], MessageService);
                return MessageService;
                var _a;
            }());
            exports_1("MessageService", MessageService);
        }
    }
});
//# sourceMappingURL=message.service.js.map
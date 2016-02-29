System.register(['angular2/core', '../logger/logger', './socket.service'], function(exports_1, context_1) {
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
    var core_1, logger_1, socket_service_1;
    var EventsReceiverService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            }],
        execute: function() {
            EventsReceiverService = (function () {
                function EventsReceiverService(_logger, _socketService) {
                    this._logger = _logger;
                    this._socket = _socketService.socket;
                    this._events = new Set();
                }
                EventsReceiverService.prototype.onEvent = function (event, fn) {
                    var _this = this;
                    var args = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        args[_i - 2] = arguments[_i];
                    }
                    this._logger.log("Adding " + event + " listener, with " + JSON.stringify(args) + " arguments.");
                    if (this._events.has(event)) {
                        this._logger.log("Already registered the event " + event + "!");
                    }
                    this._events.add(event);
                    this._socket.on(event, function (data) {
                        _this._logger.log("Got " + event + " data: " + JSON.stringify(data) + ".");
                        var dataValues = _this.grabDataFields(args, data);
                        fn.apply(fn, dataValues);
                    });
                };
                EventsReceiverService.prototype.removeOnEvent = function (event) {
                    this._logger.log("Removing " + event + " listener.");
                    if (!this._events.has(event)) {
                        this._logger.log("Event " + event + " was not registered!");
                    }
                    this._events.delete(event);
                    this._socket.removeListener(event);
                };
                EventsReceiverService.prototype.grabDataFields = function (args, data) {
                    var dataValues = [];
                    for (var i in args) {
                        var argValue = args[i];
                        dataValues[i] = data[argValue];
                    }
                    return dataValues;
                };
                EventsReceiverService.prototype.onPlayers = function (fn) {
                    this.onEvent('users', fn, 'users');
                };
                EventsReceiverService.prototype.removeOnPlayers = function () {
                    this.removeOnEvent('users');
                };
                EventsReceiverService.prototype.onTurn = function (fn) {
                    this.onEvent('turn', fn, 'id', 'bet');
                };
                EventsReceiverService.prototype.removeOnTurn = function () {
                    this.removeOnEvent('turn');
                };
                EventsReceiverService.prototype.onStart = function (fn) {
                    this.onEvent('start', fn);
                };
                EventsReceiverService.prototype.removeOnStart = function () {
                    this.removeOnEvent('start');
                };
                EventsReceiverService.prototype.onRoll = function (fn) {
                    this.onEvent('roll', fn, 'id', 'result');
                };
                EventsReceiverService.prototype.removeOnRoll = function () {
                    this.removeOnEvent('roll');
                };
                EventsReceiverService.prototype.onResults = function (fn) {
                    this.onEvent('results', fn, 'id');
                };
                EventsReceiverService.prototype.removeOnResults = function () {
                    this.removeOnEvent('results');
                };
                EventsReceiverService.prototype.onLoseDie = function (fn) {
                    this.onEvent('lose-die', fn, 'id');
                };
                EventsReceiverService.prototype.removeOnLoseDie = function () {
                    this.removeOnEvent('lose-die');
                };
                EventsReceiverService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [logger_1.Logger, socket_service_1.SocketService])
                ], EventsReceiverService);
                return EventsReceiverService;
            }());
            exports_1("EventsReceiverService", EventsReceiverService);
        }
    }
});
//# sourceMappingURL=events-receiver.service.js.map
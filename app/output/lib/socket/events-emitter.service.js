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
    var EventsEmitterService;
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
            EventsEmitterService = (function () {
                function EventsEmitterService(_logger, _socketService) {
                    this._logger = _logger;
                    this._socket = _socketService.socket;
                }
                EventsEmitterService.prototype.emitAction = function (action, params) {
                    if (params === void 0) { params = undefined; }
                    this._logger.log("Emitting action " + action + " with parameters " + JSON.stringify(params));
                    this._socket.emit(action, params);
                };
                EventsEmitterService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [logger_1.Logger, socket_service_1.SocketService])
                ], EventsEmitterService);
                return EventsEmitterService;
            }());
            exports_1("EventsEmitterService", EventsEmitterService);
        }
    }
});
//# sourceMappingURL=events-emitter.service.js.map
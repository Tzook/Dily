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
    var SocketService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            }],
        execute: function() {
            SocketService = (function () {
                function SocketService(_window, _logger) {
                    this._window = _window;
                    this._logger = _logger;
                }
                Object.defineProperty(SocketService.prototype, "isConnected", {
                    get: function () {
                        return this._isConnected;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SocketService.prototype, "socket", {
                    get: function () {
                        return this._socket;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SocketService.prototype, "myId", {
                    get: function () {
                        return "/#" + this._socket.id;
                    },
                    enumerable: true,
                    configurable: true
                });
                SocketService.prototype.connect = function (name, room) {
                    var _this = this;
                    this._logger.log("Trying to connect to socket with name " + name + " and room " + room + ".");
                    // TODO somehow solve the io issue - it is not known to typescript, when using window.io
                    this._socket = this._window['io'](this._window.location.host, { query: "room=" + room + "&name=" + name });
                    return new Promise(function (resolve, reject) {
                        _this._socket.on('connect', function () {
                            _this._logger.log("Connected successfully.");
                            _this._socket.removeListener('connect');
                            _this._socket.on('room', function (data) {
                                _this._logger.log("Got room number: " + data.room + ".");
                                _this._socket.removeListener('room');
                                _this._isConnected = true;
                                resolve(data.room);
                            });
                        });
                        _this._socket.on('error', function (data) {
                            _this._logger.log("Caught an error connecting: " + data + ".");
                            reject(data);
                        });
                        _this._socket.on('disconnect', function () {
                            _this._logger.log("Disconnected from server.");
                            _this._isConnected = false;
                        });
                    });
                };
                SocketService.prototype.disconnect = function () {
                    this._logger.log("Disconnecting socket.");
                    this._socket.disconnect();
                    this._isConnected = false;
                };
                SocketService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Window, logger_1.Logger])
                ], SocketService);
                return SocketService;
            }());
            exports_1("SocketService", SocketService);
        }
    }
});
//# sourceMappingURL=socket.service.js.map
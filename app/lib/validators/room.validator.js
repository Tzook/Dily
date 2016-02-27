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
    var MIN_ROOM, MAX_ROOM, RoomValidator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            }],
        execute: function() {
            MIN_ROOM = 1;
            MAX_ROOM = 99999;
            RoomValidator = (function () {
                function RoomValidator(_logger) {
                    this._logger = _logger;
                }
                RoomValidator.prototype.isValid = function (room) {
                    var roomNumber = +room;
                    var isValid = roomNumber === (roomNumber | 0) // is integer
                        && roomNumber >= MIN_ROOM
                        && roomNumber <= MAX_ROOM;
                    this._logger.log("Checking if room " + roomNumber + " is valid. Result is " + isValid + ".");
                    return isValid;
                };
                RoomValidator = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [logger_1.Logger])
                ], RoomValidator);
                return RoomValidator;
            }());
            exports_1("RoomValidator", RoomValidator);
        }
    }
});
//# sourceMappingURL=room.validator.js.map
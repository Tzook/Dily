System.register(['angular2/core', 'angular2/router', '../validators/room.validator'], function(exports_1, context_1) {
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
    var core_1, router_1, room_validator_1;
    var LobbyComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (room_validator_1_1) {
                room_validator_1 = room_validator_1_1;
            }],
        execute: function() {
            LobbyComponent = (function () {
                function LobbyComponent(_router, _roomValidator) {
                    this._router = _router;
                    this._roomValidator = _roomValidator;
                }
                LobbyComponent.prototype.isRoomInvalid = function (roomNumber) {
                    return !this._roomValidator.isValid(roomNumber);
                };
                LobbyComponent.prototype.joinRoom = function (room) {
                    this._router.navigate(['EnterName', { room: room }]);
                };
                LobbyComponent = __decorate([
                    core_1.Component({
                        selector: 'lobby',
                        template: "\n        <h1>~Dily~</h1>\n        <button (click)=\"joinRoom(0)\">Create room</button>\n        <p>OR</p>\n        <input #room (keyup)=\"0\" type=\"number\" placeholder=\"Room\" max=\"100000\" min=\"1\" required>\n        <button [disabled]=\"isRoomInvalid(room.value)\" (click)=\"joinRoom(room.value)\">Join room</button>\n    ",
                        providers: [room_validator_1.RoomValidator],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, room_validator_1.RoomValidator])
                ], LobbyComponent);
                return LobbyComponent;
            }());
            exports_1("LobbyComponent", LobbyComponent);
        }
    }
});
//# sourceMappingURL=lobby.component.js.map
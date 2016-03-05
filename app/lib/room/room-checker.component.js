System.register(['angular2/core', 'angular2/router', '../messages/message.service', '../socket/socket.service', './enter-name.component', './room.component'], function(exports_1, context_1) {
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
    var core_1, router_1, message_service_1, socket_service_1, enter_name_component_1, room_component_1;
    var RoomCheckerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (message_service_1_1) {
                message_service_1 = message_service_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            },
            function (enter_name_component_1_1) {
                enter_name_component_1 = enter_name_component_1_1;
            },
            function (room_component_1_1) {
                room_component_1 = room_component_1_1;
            }],
        execute: function() {
            RoomCheckerComponent = (function () {
                function RoomCheckerComponent(_socketService, _messageService, _router, _routeParams) {
                    this._socketService = _socketService;
                    this._messageService = _messageService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                }
                RoomCheckerComponent.prototype.connect = function (value) {
                    var _this = this;
                    this._socketService.connect(value, this._routeParams.get('room'))
                        .then(function (room) { return _this._router.navigate(['Room', { room: room }]); })
                        .catch(function (error) { return _this._messageService.message = { text: error, type: 'error' }; });
                };
                RoomCheckerComponent.prototype.ngOnDestroy = function () {
                    // TODO
                    // this._socketService.disconnect();
                };
                RoomCheckerComponent = __decorate([
                    core_1.Component({
                        selector: 'room-checker',
                        template: "\n        <div [ngSwitch]=\"_socketService.isConnected\">\n            <template ngSwitchDefault>\n                <enter-name (connect)=\"connect($event)\"></enter-name>\n            </template>\n            <template [ngSwitchWhen]=\"true\">\n                <room [myId]=\"_socketService.myId\"></room>\n            </template>\n        </div>\n    ",
                        directives: [enter_name_component_1.EnterNameComponent, room_component_1.RoomComponent],
                    }), 
                    __metadata('design:paramtypes', [socket_service_1.SocketService, message_service_1.MessageService, router_1.Router, router_1.RouteParams])
                ], RoomCheckerComponent);
                return RoomCheckerComponent;
            }());
            exports_1("RoomCheckerComponent", RoomCheckerComponent);
        }
    }
});
//# sourceMappingURL=room-checker.component.js.map
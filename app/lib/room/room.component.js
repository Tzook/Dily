System.register(['angular2/core', 'angular2/router', '../socket/socket.service', '../players/players.component'], function(exports_1, context_1) {
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
    var core_1, router_1, socket_service_1, players_component_1;
    var RoomComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            },
            function (players_component_1_1) {
                players_component_1 = players_component_1_1;
            }],
        execute: function() {
            RoomComponent = (function () {
                function RoomComponent(_router, _routeParams, _socketService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._socketService = _socketService;
                    if (!this._socketService.isConnected) {
                        // TODO is there a way to navigate and replace the history?
                        _router.navigate(['EnterName', { room: this._routeParams.get('room') }]);
                    }
                    else {
                        this._enabled = true;
                    }
                }
                RoomComponent.prototype.ngOnDestroy = function () {
                    this._socketService.disconnect();
                };
                RoomComponent = __decorate([
                    core_1.Component({
                        selector: 'room',
                        template: "\n        <div *ngIf=\"_enabled\">\n            <players></players>\n            In room.\n        </div>\n    ",
                        directives: [players_component_1.PlayersComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, socket_service_1.SocketService])
                ], RoomComponent);
                return RoomComponent;
            }());
            exports_1("RoomComponent", RoomComponent);
        }
    }
});
//# sourceMappingURL=room.component.js.map
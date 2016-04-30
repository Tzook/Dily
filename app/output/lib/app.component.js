System.register(['angular2/core', 'angular2/router', './messages/message-handler.component', './messages/message.service', './lobby/lobby.component', './room/room-checker.component'], function(exports_1, context_1) {
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
    var core_1, router_1, message_handler_component_1, message_service_1, lobby_component_1, room_checker_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (message_handler_component_1_1) {
                message_handler_component_1 = message_handler_component_1_1;
            },
            function (message_service_1_1) {
                message_service_1 = message_service_1_1;
            },
            function (lobby_component_1_1) {
                lobby_component_1 = lobby_component_1_1;
            },
            function (room_checker_component_1_1) {
                room_checker_component_1 = room_checker_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <message-handler></message-handler>\n        <router-outlet></router-outlet>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES, message_handler_component_1.MessageHandlerComponent],
                        providers: [message_service_1.MessageService],
                    }),
                    router_1.RouteConfig([
                        {
                            useAsDefault: true,
                            path: '/lobby',
                            name: 'Lobby',
                            component: lobby_component_1.LobbyComponent,
                        },
                        {
                            path: '/room/:room',
                            name: 'Room',
                            component: room_checker_component_1.RoomCheckerComponent
                        },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map
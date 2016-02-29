System.register(['angular2/core', 'angular2/router', '../socket/socket.service', '../players/players.component', '../socket/events-receiver.service', '../socket/events-emitter.service', '../actions/actions.component'], function(exports_1, context_1) {
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
    var core_1, router_1, socket_service_1, players_component_1, events_receiver_service_1, events_emitter_service_1, actions_component_1;
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
            },
            function (events_receiver_service_1_1) {
                events_receiver_service_1 = events_receiver_service_1_1;
            },
            function (events_emitter_service_1_1) {
                events_emitter_service_1 = events_emitter_service_1_1;
            },
            function (actions_component_1_1) {
                actions_component_1 = actions_component_1_1;
            }],
        execute: function() {
            RoomComponent = (function () {
                function RoomComponent(_router, _routeParams, _socketService, _eventsReceiverService, _eventsEmitterService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._socketService = _socketService;
                    this._eventsReceiverService = _eventsReceiverService;
                    this._eventsEmitterService = _eventsEmitterService;
                    if (!this._socketService.isConnected) {
                        // TODO is there a way to navigate and replace the history?
                        // OR prevent getting to this page to begin with?
                        _router.navigate(['EnterName', { room: this._routeParams.get('room') }]);
                    }
                    else {
                        this._players = {};
                        this._enabled = true;
                        this._state = "start";
                    }
                }
                RoomComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._eventsReceiverService.onPlayers(function (players) { return _this._players = players; });
                    this._eventsReceiverService.onTurn(function (turnId, bet) {
                        _this._state = "bet";
                        _this._turnId = turnId;
                        _this._bet = bet;
                    });
                    this._eventsReceiverService.onStart(function () { return _this._state = "roll"; });
                    this._eventsReceiverService.onRoll(function (id, result) { return _this._players[id].result = result; });
                };
                RoomComponent.prototype.ngOnDestroy = function () {
                    if (this._enabled) {
                        this._eventsReceiverService.removeOnPlayers();
                        this._eventsReceiverService.removeOnTurn();
                        this._eventsReceiverService.removeOnStart();
                        this._eventsReceiverService.removeOnRoll();
                        this._socketService.disconnect();
                    }
                };
                RoomComponent.prototype.handleAction = function (action, params) {
                    if (params === void 0) { params = undefined; }
                    this._eventsEmitterService.emitAction(action, params);
                };
                RoomComponent = __decorate([
                    core_1.Component({
                        selector: 'room',
                        template: "\n        <div *ngIf=\"_enabled\">\n            <players [list]=\"_players\"></players>\n            <actions [state]=\"_state\" [isMyTurn]=\"_turnId === _socketService.myId\" (action)=\"handleAction($event.action, $event.params)\"></actions>\n        </div>\n    ",
                        directives: [players_component_1.PlayersComponent, actions_component_1.ActionsComponent],
                        providers: [events_receiver_service_1.EventsReceiverService, events_emitter_service_1.EventsEmitterService],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, socket_service_1.SocketService, events_receiver_service_1.EventsReceiverService, events_emitter_service_1.EventsEmitterService])
                ], RoomComponent);
                return RoomComponent;
            }());
            exports_1("RoomComponent", RoomComponent);
        }
    }
});
//# sourceMappingURL=room.component.js.map
System.register(['angular2/core', '../players/players.component', '../bet/bet.component', '../socket/events-receiver.service', '../socket/events-emitter.service', '../actions/actions.component'], function(exports_1, context_1) {
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
    var core_1, players_component_1, bet_component_1, events_receiver_service_1, events_emitter_service_1, actions_component_1;
    var RoomComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (players_component_1_1) {
                players_component_1 = players_component_1_1;
            },
            function (bet_component_1_1) {
                bet_component_1 = bet_component_1_1;
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
                function RoomComponent(_eventsReceiverService, _eventsEmitterService) {
                    this._eventsReceiverService = _eventsReceiverService;
                    this._eventsEmitterService = _eventsEmitterService;
                    this._players = {};
                    this._state = "start";
                    this._bet = { count: 0, die: 0 };
                }
                RoomComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._eventsReceiverService.onPlayers(function (players) { return _this._players = players; });
                    this._eventsReceiverService.onTurn(this.onTurn.bind(this));
                    this._eventsReceiverService.onStart(function () { return _this._state = "roll"; });
                    this._eventsReceiverService.onRoll(function (id, result) { return _this._players[id].result = result; });
                    this._eventsReceiverService.onResults(function (id) { return _this._state = (_this.myId === id ? "next" : ""); });
                    this._eventsReceiverService.onLoseDie(function (id) { return _this._players[id].count--; });
                };
                RoomComponent.prototype.ngOnDestroy = function () {
                    this._eventsReceiverService.removeOnPlayers();
                    this._eventsReceiverService.removeOnTurn();
                    this._eventsReceiverService.removeOnStart();
                    this._eventsReceiverService.removeOnRoll();
                    this._eventsReceiverService.removeOnResults();
                    this._eventsReceiverService.removeOnLoseDie();
                };
                RoomComponent.prototype.handleAction = function (action, params) {
                    if (params === void 0) { params = undefined; }
                    this._eventsEmitterService.emitAction(action, params);
                };
                RoomComponent.prototype.onTurn = function (turnId, bet) {
                    this._state = "bet";
                    this._bet = bet;
                    if (this._turnId) {
                        this._players[this._turnId].turn = false;
                    }
                    this._players[this._turnId = turnId].turn = true;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], RoomComponent.prototype, "myId", void 0);
                RoomComponent = __decorate([
                    core_1.Component({
                        selector: 'room',
                        template: "\n        <players [list]=\"_players\"></players>\n        <h1 [hidden]=\"myId != _turnId\">YOUR TURN!</h1>\n        <bet [hidden]=\"_state !== 'bet'\" [count]=\"_bet.count\" [result]=\"_bet.die\"></bet>\n        <actions [state]=\"_state\" [noBet]=\"_bet.count == 0\" [notMyTurn]=\"myId != _turnId\" (action)=\"handleAction($event.action, $event.params)\"></actions>\n    ",
                        directives: [players_component_1.PlayersComponent, bet_component_1.BetComponent, actions_component_1.ActionsComponent],
                        providers: [events_receiver_service_1.EventsReceiverService, events_emitter_service_1.EventsEmitterService],
                    }), 
                    __metadata('design:paramtypes', [events_receiver_service_1.EventsReceiverService, events_emitter_service_1.EventsEmitterService])
                ], RoomComponent);
                return RoomComponent;
            }());
            exports_1("RoomComponent", RoomComponent);
        }
    }
});
//# sourceMappingURL=room.component.js.map
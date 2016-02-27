System.register(['angular2/core', './players.service', './player.component'], function(exports_1, context_1) {
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
    var core_1, players_service_1, player_component_1;
    var PlayersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (players_service_1_1) {
                players_service_1 = players_service_1_1;
            },
            function (player_component_1_1) {
                player_component_1 = player_component_1_1;
            }],
        execute: function() {
            PlayersComponent = (function () {
                function PlayersComponent(_playersService) {
                    this._playersService = _playersService;
                    this._players = [];
                }
                PlayersComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._playersService.onPlayers(function (players) { return _this._players = players; });
                    // this._playersService.onTurn(id => {
                    //     for (var i in this._players) {
                    //         var player = this._players[i];
                    //         player.turn = (player.id === id);
                    //     }
                    // });
                };
                PlayersComponent.prototype.ngOnDestroy = function () {
                    this._playersService.removeOnPlayers();
                    // this._playersService.removeOnTurn();
                };
                PlayersComponent = __decorate([
                    core_1.Component({
                        selector: 'players',
                        template: "\n        <ul class=\"players\">\n            <player *ngFor=\"#player of _players\" [name]=\"player.name\"></player>\n        </ul>\n        Players list.\n    ",
                        directives: [player_component_1.PlayerComponent],
                        providers: [players_service_1.PlayersService],
                    }), 
                    __metadata('design:paramtypes', [players_service_1.PlayersService])
                ], PlayersComponent);
                return PlayersComponent;
            }());
            exports_1("PlayersComponent", PlayersComponent);
        }
    }
});
//# sourceMappingURL=players.component.js.map
System.register(['angular2/core', './player.component'], function(exports_1, context_1) {
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
    var core_1, player_component_1;
    var PlayersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (player_component_1_1) {
                player_component_1 = player_component_1_1;
            }],
        execute: function() {
            PlayersComponent = (function () {
                function PlayersComponent() {
                }
                PlayersComponent.prototype.getPlayers = function () {
                    var _this = this;
                    return Object.keys(this.list).map(function (item) { return _this.list[item]; });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], PlayersComponent.prototype, "list", void 0);
                PlayersComponent = __decorate([
                    core_1.Component({
                        selector: 'players',
                        template: "\n        <ul class=\"players\">\n            <player *ngFor=\"#player of getPlayers()\" [name]=\"player.name\" [result]=\"player.result\"></player>\n        </ul>\n    ",
                        directives: [player_component_1.PlayerComponent],
                    }), 
                    __metadata('design:paramtypes', [])
                ], PlayersComponent);
                return PlayersComponent;
            }());
            exports_1("PlayersComponent", PlayersComponent);
        }
    }
});
//# sourceMappingURL=players.component.js.map
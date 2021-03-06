System.register(['angular2/core', '../dice/hand.component'], function(exports_1, context_1) {
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
    var core_1, hand_component_1;
    var PlayerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (hand_component_1_1) {
                hand_component_1 = hand_component_1_1;
            }],
        execute: function() {
            PlayerComponent = (function () {
                function PlayerComponent() {
                    this._roll = 0;
                }
                PlayerComponent.prototype.ngOnChanges = function (changes) {
                    var result = changes.result;
                    if (result && result.currentValue !== result.previousValue && !result.isFirstChange()) {
                        this._roll++;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], PlayerComponent.prototype, "name", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], PlayerComponent.prototype, "turn", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], PlayerComponent.prototype, "result", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], PlayerComponent.prototype, "count", void 0);
                PlayerComponent = __decorate([
                    core_1.Component({
                        selector: 'player',
                        template: "\n        <li>\n            <span [class.turn]=\"turn\">{{name}}</span>\n            <hand [count]=\"count\" [result]=\"result\" [roll]=\"_roll\"></hand>\n        </li>\n    ",
                        directives: [hand_component_1.HandComponent],
                    }), 
                    __metadata('design:paramtypes', [])
                ], PlayerComponent);
                return PlayerComponent;
            }());
            exports_1("PlayerComponent", PlayerComponent);
        }
    }
});
//# sourceMappingURL=player.component.js.map
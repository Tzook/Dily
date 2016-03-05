System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var ActionBetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ActionBetComponent = (function () {
                function ActionBetComponent() {
                    this.bet = new core_1.EventEmitter();
                    this.lying = new core_1.EventEmitter();
                }
                ActionBetComponent.prototype._emitBet = function (count, die) {
                    this.bet.emit({ count: count, die: die });
                };
                ActionBetComponent.prototype._emitLying = function () {
                    this.lying.emit({});
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], ActionBetComponent.prototype, "disableBet", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], ActionBetComponent.prototype, "disableLying", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], ActionBetComponent.prototype, "bet", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], ActionBetComponent.prototype, "lying", void 0);
                ActionBetComponent = __decorate([
                    core_1.Component({
                        selector: 'action-bet',
                        template: "\n        <div class=\"bet-values\">\n            <input #count (keyup)=\"0\" (mouseup)=\"0\" type=\"number\" min=\"1\" max=\"99\">\n            <input #die (keyup)=\"0\" (mouseup)=\"0\" type=\"number\" min=\"1\" max=\"6\">\n        </div>\n        <button [disabled]=\"disableBet || !count.value || !die.value\" (click)=\"_emitBet(count.value, die.value); count.value = die.value = ''\">bet</button>\n        <button [disabled]=\"disableLying\" (click)=\"_emitLying()\">lying!</button>\n    ",
                        directives: [],
                    }), 
                    __metadata('design:paramtypes', [])
                ], ActionBetComponent);
                return ActionBetComponent;
            }());
            exports_1("ActionBetComponent", ActionBetComponent);
        }
    }
});
//# sourceMappingURL=action-bet.component.js.map
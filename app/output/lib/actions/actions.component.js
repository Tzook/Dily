System.register(['angular2/core', './action-start.component', './action-bet.component'], function(exports_1, context_1) {
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
    var core_1, action_start_component_1, action_bet_component_1;
    var ActionsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (action_start_component_1_1) {
                action_start_component_1 = action_start_component_1_1;
            },
            function (action_bet_component_1_1) {
                action_bet_component_1 = action_bet_component_1_1;
            }],
        execute: function() {
            ActionsComponent = (function () {
                function ActionsComponent() {
                    this.action = new core_1.EventEmitter();
                }
                ActionsComponent.prototype._emitAction = function (action, params) {
                    if (params === void 0) { params = undefined; }
                    this.action.emit({ action: action, params: params });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ActionsComponent.prototype, "state", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], ActionsComponent.prototype, "hasBet", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], ActionsComponent.prototype, "myTurn", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], ActionsComponent.prototype, "action", void 0);
                ActionsComponent = __decorate([
                    core_1.Component({
                        selector: 'actions',
                        template: "\n        <div [ngSwitch]=\"state\">\n            <template ngSwitchWhen=\"start\">\n                <action-start (start)=\"_emitAction('start')\"></action-start>\n            </template>\n            <template ngSwitchWhen=\"roll\">\n                <button #rollButton (click)=\"rollButton.disabled = true; _emitAction('roll');\">roll</button>\n            </template>\n            <template ngSwitchWhen=\"bet\">\n                <action-bet [disableBet]=\"!myTurn\" [disableLying]=\"!myTurn || !hasBet\" (lying)=\"_emitAction('lying')\" (bet)=\"_emitAction('bet', $event)\"></action-bet>\n            </template>\n            <template ngSwitchWhen=\"next\">\n                <button (click)=\"_emitAction('next')\">continue</button>\n            </template>\n        </div>\n    ",
                        directives: [action_start_component_1.ActionStartComponent, action_bet_component_1.ActionBetComponent],
                    }), 
                    __metadata('design:paramtypes', [])
                ], ActionsComponent);
                return ActionsComponent;
            }());
            exports_1("ActionsComponent", ActionsComponent);
        }
    }
});
//# sourceMappingURL=actions.component.js.map
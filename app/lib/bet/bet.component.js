System.register(['angular2/core', '../dice/die.component'], function(exports_1, context_1) {
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
    var core_1, die_component_1;
    var BetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (die_component_1_1) {
                die_component_1 = die_component_1_1;
            }],
        execute: function() {
            BetComponent = (function () {
                function BetComponent() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], BetComponent.prototype, "count", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], BetComponent.prototype, "result", void 0);
                BetComponent = __decorate([
                    core_1.Component({
                        selector: 'bet',
                        template: "\n        <h2>Current bet</h2>\n        <h1>{{count}}</h1>\n        <die [scale]=\"1\" [result]=\"result\"></die>\n    ",
                        directives: [die_component_1.DieComponent],
                        providers: [],
                    }), 
                    __metadata('design:paramtypes', [])
                ], BetComponent);
                return BetComponent;
            }());
            exports_1("BetComponent", BetComponent);
        }
    }
});
//# sourceMappingURL=bet.component.js.map
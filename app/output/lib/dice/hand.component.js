System.register(['angular2/core', './die.component'], function(exports_1, context_1) {
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
    var HandComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (die_component_1_1) {
                die_component_1 = die_component_1_1;
            }],
        execute: function() {
            HandComponent = (function () {
                function HandComponent() {
                }
                // angular 2 can use ngFor only on arrays, so we must convert the object to array
                HandComponent.prototype._getArray = function () {
                    // TODO why is it highlighted as bad when we use .from?
                    return Array['from'](new Array(this.count), function (x, i) { return i; });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], HandComponent.prototype, "count", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], HandComponent.prototype, "result", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], HandComponent.prototype, "roll", void 0);
                HandComponent = __decorate([
                    core_1.Component({
                        selector: 'hand',
                        template: "\n        <die *ngFor=\"#i of _getArray()\" [style.left.px]=\"i * 50\" [scale]=\"0.5\" [result]=\"result && result[i]\" [roll]=\"roll\"></die>\n    ",
                        directives: [die_component_1.DieComponent],
                    }), 
                    __metadata('design:paramtypes', [])
                ], HandComponent);
                return HandComponent;
            }());
            exports_1("HandComponent", HandComponent);
        }
    }
});
//# sourceMappingURL=hand.component.js.map
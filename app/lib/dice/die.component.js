System.register(['angular2/core', './face.component'], function(exports_1, context_1) {
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
    var core_1, face_component_1;
    var FACES, INITIAL_TILT, DieComponent;
    // TODO move this somewhere generic
    function getRandomNumber(start, end) {
        return (Math.random() * (end - start + 1) + start) | 0;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (face_component_1_1) {
                face_component_1 = face_component_1_1;
            }],
        execute: function() {
            FACES = [
                { class: "six", locations: ["t-l", "t-r", "m-l", "m-r", "b-l", "b-r"] },
                { class: "one", locations: ["m-m"] },
                { class: "three", locations: ["t-l", "m-m", "b-r"] },
                { class: "four", locations: ["t-l", "t-r", "b-l", "b-r"] },
                { class: "two", locations: ["b-l", "t-r"] },
                { class: "five", locations: ["t-l", "t-r", "m-m", "b-l", "b-r"] }
            ];
            INITIAL_TILT = { x: 30, z: 20 };
            DieComponent = (function () {
                function DieComponent() {
                    this._faces = FACES;
                    this._tilt = "rotateX(" + INITIAL_TILT.x + "deg) rotateZ(" + INITIAL_TILT.z + "deg)";
                    this._rolling = false;
                }
                DieComponent.prototype.ngOnChanges = function (changes) {
                    var roll = changes.roll;
                    if (roll && roll.currentValue !== roll.previousValue && !roll.isFirstChange()) {
                        this.beginRoll();
                    }
                };
                DieComponent.prototype.beginRoll = function () {
                    var _this = this;
                    this._rolling = false;
                    setTimeout(function () {
                        // tilt
                        var tiltZ = getRandomNumber(0, 360);
                        var tiltX = getRandomNumber(20, 35);
                        _this._tilt = "rotateX(" + tiltX + "deg) rotateZ(" + tiltZ + "deg)";
                        // flip time
                        _this._flipTime = (3 + Math.random() * 4) + 's';
                        _this._rolling = true;
                    }, 10);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], DieComponent.prototype, "scale", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], DieComponent.prototype, "result", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], DieComponent.prototype, "roll", void 0);
                DieComponent = __decorate([
                    core_1.Component({
                        selector: 'die',
                        template: "\n        <div class=\"layer\" [style.transform]=\"'scale(' + scale + ')'\">\n            <div class=\"layer\" [style.transform]=\"_tilt\">\n                <div class=\"layer\" [class.rolll]=\"_rolling\" [style.animation-duration]=\"_flipTime\">\n                    <div [class]=\"'layer result-' + (result || 0)\">\n                        <face *ngFor=\"#face of _faces\" [class]=\"face.class\" [locations]=\"face.locations\"></face>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                        directives: [face_component_1.FaceComponent],
                        providers: [],
                    }), 
                    __metadata('design:paramtypes', [])
                ], DieComponent);
                return DieComponent;
            }());
            exports_1("DieComponent", DieComponent);
        }
    }
});
//# sourceMappingURL=die.component.js.map
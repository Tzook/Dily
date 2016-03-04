System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var EnterNameComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            EnterNameComponent = (function () {
                function EnterNameComponent() {
                    this.connect = new core_1.EventEmitter();
                }
                EnterNameComponent.prototype.emitConnect = function (name) {
                    this.connect.emit(name);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], EnterNameComponent.prototype, "connect", void 0);
                EnterNameComponent = __decorate([
                    core_1.Component({
                        selector: 'enter-name',
                        template: "\n        <h2>Enter your name</h2>\n        <input #name (keyup.enter)=\"emitConnect(name.value)\" type=\"text\" placeholder=\"Name\">\n        <button (click)=\"emitConnect(name.value)\">Connect</button>\n        <button [routerLink]=\"['Lobby']\">Back to lobby</button>\n    ",
                        providers: [],
                        directives: [router_1.ROUTER_DIRECTIVES],
                    }), 
                    __metadata('design:paramtypes', [])
                ], EnterNameComponent);
                return EnterNameComponent;
            }());
            exports_1("EnterNameComponent", EnterNameComponent);
        }
    }
});
//# sourceMappingURL=enter-name.component.js.map
System.register(['angular2/core', '../collapse/collapse.directive'], function(exports_1, context_1) {
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
    var core_1, collapse_directive_1;
    var MessageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (collapse_directive_1_1) {
                collapse_directive_1 = collapse_directive_1_1;
            }],
        execute: function() {
            MessageComponent = (function () {
                function MessageComponent() {
                    this.messageGone = new core_1.EventEmitter();
                }
                MessageComponent.prototype._emitIfCollapsed = function (collapsed) {
                    if (collapsed) {
                        this.messageGone.emit({});
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MessageComponent.prototype, "visible", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MessageComponent.prototype, "text", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MessageComponent.prototype, "type", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], MessageComponent.prototype, "messageGone", void 0);
                MessageComponent = __decorate([
                    core_1.Component({
                        selector: 'message',
                        template: "\n        <div [collapsed]=\"!visible\" (animationStable)=\"_emitIfCollapsed($event.collapsed)\">{{text}}</div>\n    ",
                        directives: [collapse_directive_1.CollapseDirective],
                    }), 
                    __metadata('design:paramtypes', [])
                ], MessageComponent);
                return MessageComponent;
            }());
            exports_1("MessageComponent", MessageComponent);
        }
    }
});
//# sourceMappingURL=message.component.js.map
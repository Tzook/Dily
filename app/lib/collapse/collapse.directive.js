System.register(['angular2/core', 'angular2/src/animate/animation_builder'], function(exports_1, context_1) {
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
    var core_1, animation_builder_1;
    var DEFAULT_COLLAPSE_TIME, CollapseDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            }],
        execute: function() {
            DEFAULT_COLLAPSE_TIME = 400;
            CollapseDirective = (function () {
                function CollapseDirective(_animationBuilder, el) {
                    this._animationBuilder = _animationBuilder;
                    this._el = el.nativeElement;
                    // always mendatory, since layout sometimes changes when overflow changes
                    this._el.style.overflow = 'hidden';
                }
                CollapseDirective.prototype.hideElement = function () {
                    this._el.style.height = '0px';
                };
                CollapseDirective.prototype.showElement = function () {
                    this._el.style.height = 'auto';
                };
                CollapseDirective.prototype.animate = function (from, to) {
                    this._animationBuilder.css()
                        .setDuration(this.collapseTime || DEFAULT_COLLAPSE_TIME)
                        .setFromStyles({ height: from })
                        .setToStyles({ height: to })
                        .start(this._el)
                        .onComplete(to === '0px' ? this.hideElement.bind(this) : this.showElement.bind(this));
                };
                CollapseDirective.prototype.toggleElement = function (collapse) {
                    var fullHeight = this._el.scrollHeight + 'px';
                    if (collapse) {
                        this.animate(fullHeight, '0px');
                    }
                    else {
                        this.animate('0px', fullHeight);
                    }
                };
                CollapseDirective.prototype.ngOnChanges = function (changes) {
                    var collapse = changes.collapse;
                    console.log(collapse);
                    if (collapse.isFirstChange()) {
                        // we want to simply hide/show the element based on the initial value
                        collapse.currentValue ? this.hideElement() : this.showElement();
                    }
                    else if (collapse.currentValue !== collapse.previousValue) {
                        this.toggleElement(collapse.currentValue);
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], CollapseDirective.prototype, "collapse", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], CollapseDirective.prototype, "collapseTime", void 0);
                CollapseDirective = __decorate([
                    core_1.Directive({
                        selector: '[collapse]',
                    }), 
                    __metadata('design:paramtypes', [animation_builder_1.AnimationBuilder, core_1.ElementRef])
                ], CollapseDirective);
                return CollapseDirective;
            }());
            exports_1("CollapseDirective", CollapseDirective);
        }
    }
});
//# sourceMappingURL=collapse.directive.js.map
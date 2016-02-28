System.register(['angular2/core', '../logger/logger'], function(exports_1, context_1) {
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
    var core_1, logger_1;
    var MIN_LENGTH, MAX_LENGTH, NameValidator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            }],
        execute: function() {
            MIN_LENGTH = 1;
            MAX_LENGTH = 15;
            NameValidator = (function () {
                function NameValidator(_logger) {
                    this._logger = _logger;
                }
                NameValidator.prototype.isValid = function (name) {
                    var isValid = typeof name === 'string'
                        && name.length >= MIN_LENGTH
                        && name.length <= MAX_LENGTH
                        && !/[^\w ]/.test(name); // doesn't have anything other than words and space
                    this._logger.log("Checking if name " + name + " is valid. Result is " + isValid + ".");
                    return isValid;
                };
                NameValidator = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [logger_1.Logger])
                ], NameValidator);
                return NameValidator;
            }());
            exports_1("NameValidator", NameValidator);
        }
    }
});
//# sourceMappingURL=name.validator.js.map
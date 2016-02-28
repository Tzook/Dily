System.register(['angular2/core', 'angular2/router', './name.validator', '../socket/socket.service'], function(exports_1, context_1) {
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
    var core_1, router_1, name_validator_1, socket_service_1;
    var EnterNameComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (name_validator_1_1) {
                name_validator_1 = name_validator_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            }],
        execute: function() {
            EnterNameComponent = (function () {
                function EnterNameComponent(_router, _routeParams, _nameValidator, _socketService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._nameValidator = _nameValidator;
                    this._socketService = _socketService;
                    this._error = '';
                }
                EnterNameComponent.prototype.isNameInvalid = function (name) {
                    return !this._nameValidator.isValid(name);
                };
                EnterNameComponent.prototype.connect = function (value) {
                    var _this = this;
                    this._loading = true;
                    this._socketService.connect(value, this._routeParams.get('room'))
                        .then(function (room) {
                        _this._router.navigate(['Room', { room: room }]);
                    })
                        .catch(function (error) {
                        _this._loading = false;
                        _this._error = error;
                    });
                };
                EnterNameComponent = __decorate([
                    core_1.Component({
                        selector: 'enter-name',
                        template: "\n        <h2>Enter your name</h2>\n        <input #name (keyup)=\"_error = ''\" (keyup.enter)=\"!isNameInvalid(name.value) && connect(name.value)\" type=\"text\" placeholder=\"Name\">\n        <button [disabled]=\"_loading || isNameInvalid(name.value)\" (click)=\"connect(name.value)\">Connect</button>\n        <button [routerLink]=\"['Lobby']\">Back to lobby</button>\n        <p [hidden]=\"!_error\">{{_error}}</p>\n    ",
                        providers: [name_validator_1.NameValidator],
                        directives: [router_1.ROUTER_DIRECTIVES],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, name_validator_1.NameValidator, socket_service_1.SocketService])
                ], EnterNameComponent);
                return EnterNameComponent;
            }());
            exports_1("EnterNameComponent", EnterNameComponent);
        }
    }
});
//# sourceMappingURL=enter-name.component.js.map
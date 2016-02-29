/// <reference path="node_modules/angular2/typings/browser.d.ts" />
System.register(['./app/lib/app.component', './app/lib/logger/logger', './app/lib/socket/socket.service', 'angular2/platform/browser', 'angular2/router', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_component_1, logger_1, socket_service_1, browser_1, router_1, core_1;
    var windowProvide;
    return {
        setters:[
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            windowProvide = core_1.provide(Window, { useValue: window });
            console.log('bootstrapping');
            browser_1.bootstrap(app_component_1.AppComponent, [router_1.ROUTER_PROVIDERS, logger_1.Logger, socket_service_1.SocketService, windowProvide]);
        }
    }
});
//# sourceMappingURL=index.js.map
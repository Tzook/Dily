/// <reference path="../node_modules/angular2/typings/browser.d.ts" />
System.register(['./lib/app.component', './lib/logger/logger', 'angular2/platform/browser', 'angular2/router', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_component_1, logger_1, browser_1, router_1, core_1;
    var windowProvide;
    return {
        setters:[
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
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
            browser_1.bootstrap(app_component_1.AppComponent, [router_1.ROUTER_PROVIDERS, logger_1.Logger, windowProvide]);
        }
    }
});
//# sourceMappingURL=index.js.map
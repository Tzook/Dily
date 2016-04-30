/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import {AppComponent} from './lib/app.component';
import {Logger} from './lib/logger/logger';
import {SocketService} from './lib/socket/socket.service';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {provide} from 'angular2/core';

let windowProvide = provide(Window, {useValue: window}); 

bootstrap(AppComponent, [ROUTER_PROVIDERS, Logger, SocketService, windowProvide]);
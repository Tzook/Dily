import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {LobbyComponent} from './lobby/lobby.component';
import {RoomCheckerComponent} from './room/room-checker.component';

@Component({
    selector: 'my-app',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
    {path: '/lobby', name: 'Lobby', component: LobbyComponent, useAsDefault: true},
    {path: '/room/:room', name: 'Room',  component: RoomCheckerComponent},
])
export class AppComponent {}
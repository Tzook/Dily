import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {LobbyComponent} from './lobby/lobby.component';
import {EnterNameComponent} from './room/enter-name.component';
import {RoomComponent} from './room/room.component';

@Component({
    selector: 'my-app',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
    {path: '/lobby', name: 'Lobby', component: LobbyComponent, useAsDefault: true},
    {path: '/enter-name/:room', name: 'EnterName',  component: EnterNameComponent},
    {path: '/room/:room', name: 'Room',  component: RoomComponent},
])
export class AppComponent {}
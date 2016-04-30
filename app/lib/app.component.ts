import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {MessageHandlerComponent} from './messages/message-handler.component';
import {MessageService} from './messages/message.service';
import {LobbyComponent} from './lobby/lobby.component';
import {RoomCheckerComponent} from './room/room-checker.component';

@Component({
    selector: 'my-app',
    template: `
        <message-handler></message-handler>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES, MessageHandlerComponent],
    providers: [MessageService],
})
@RouteConfig([
    {
        useAsDefault: true,
        path: '/lobby', 
        name: 'Lobby', 
        component: LobbyComponent, 
    },
    {
        path: '/room/:room', 
        name: 'Room',
        component: RoomCheckerComponent
    },
])
export class AppComponent {}
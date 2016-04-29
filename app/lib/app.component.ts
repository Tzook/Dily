import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {BoardComponent} from './board/board.component';

@Component({
    selector: 'my-app',
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES, BoardComponent],
    providers: [],
})
@RouteConfig([
    {
        useAsDefault: true,
        path: '/board', 
        name: 'Board', 
        component: BoardComponent, 
    },
])
export class AppComponent {}
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AboutComponent} from './components/about';
import {HomeComponent} from './components/home';

import '../assets/styles/main.css';

@Component({
    selector: 'angular2-presentation',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'assets/views/main.html'
})
@RouteConfig([
    {path: '/home', component: HomeComponent, name: 'Home', useAsDefault: true},
    {path: '/about', component: AboutComponent, name: 'About'}
])
export class MainComponent {

    constructor() {
    }

}

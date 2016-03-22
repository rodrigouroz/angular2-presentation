import {bootstrap}    from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {BackendService} from './app/services/backend';
import {MainComponent} from './app/main';

if ('development' !== process.env.ENV) {
  enableProdMode();
}

bootstrap(MainComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, BackendService]);

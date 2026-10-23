import { ApplicationConfig } from '@angular/core';
import { appRoutes } from './app.routers';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes, 
    withComponentInputBinding(), 
    withRouterConfig({ paramsInheritanceStrategy: 'always' }))
  ],
};
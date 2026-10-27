import { CanMatchFn, Routes, Route, Router, UrlSegment, RedirectCommand } from '@angular/router';

import { inject } from '@angular/core' 
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes } from './users/user.routers'
import { getUserName, resolveTitle } from './users/user-tasks/user-tasks.component';

const dummyCanMatch : CanMatchFn = (route: Route, segments: UrlSegment[]) =>{
    const router = inject(Router);
    const shouldGetAccess = Math.random();    
    if(shouldGetAccess < 1){
        return true;
    }
    return new RedirectCommand(router.parseUrl('./unauthorized')); 
} 

export const appRoutes: Routes = [
    { 
        path: '', // <your-domain>/
        component: NoTaskComponent,
        title: 'No User Selected'
    },
    { 
        path: 'user/:userid',  // <your-domain>
        component:  UserTasksComponent,
        children: routes,
        data: {
            message: 'User Tasks'
        },
        canMatch: [ dummyCanMatch ],
        resolve: {
            userName: getUserName
        },
        title: resolveTitle
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
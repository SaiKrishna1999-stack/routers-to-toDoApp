import { Routes } from '@angular/router';

import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes } from './users/user.routers'
import { getUserName } from './users/user-tasks/user-tasks.component';

export const appRoutes: Routes = [
    { 
        path: '', // <your-domain>/
        component: NoTaskComponent 
    },
    { 
        path: 'user/:userid',  // <your-domain>
        component:  UserTasksComponent,
        children: routes,
        data: {
            message: 'User Tasks'
        },
        resolve: {
            userName: getUserName
        }
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
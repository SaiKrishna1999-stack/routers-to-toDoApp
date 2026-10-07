import { Routes } from '@angular/router';

import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';

export const appRoutes: Routes = [
    { 
        path: '', // <your-domain>/
        component: NoTaskComponent 
    },
    { 
        path: 'user/:userid',  // <your-domain>
        component:  UserTasksComponent
    }
];
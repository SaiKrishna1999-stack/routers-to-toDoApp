import { Component, input, inject, computed, DestroyRef, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { RouterLink, ResolveFn, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  order= signal<'asc' | 'desc'>('desc');
  userid = input.required<string>();
  userTasks = input.required<Task[]>();
}

export const getUserTasks: ResolveFn<Task[]> = (activatedRouteSnapshot: ActivatedRouteSnapshot, routerStatesSnapshot: RouterStateSnapshot) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userid')
    );

  if(order && order === 'asc'){
    tasks.sort((a,b) => (a.id> b.id? 1: -1))
  }
  else{
    tasks.sort((a,b)=>(a.id > b.id? -1: 1))
  }

  return tasks.length? tasks: [];
}

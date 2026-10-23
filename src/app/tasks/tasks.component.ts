import { Component, input, inject, computed } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent {
  userid = input.required<string>();
  private tasks = inject(TasksService);

  userTasks = computed(() => {
     return this.tasks.allTasks().filter((task) => task.userId === this.userid());
  });

}

import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, CanDeactivateFn } from '@angular/router';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userid = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private tasksService = inject(TasksService);
  private router = inject(Router);
  submit= false;

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userid()
    );
    this.submit = true;
    this.router.navigate(['/user', this.userid(), 'tasks']);
  }
}

export const canLeaveEditPage : CanDeactivateFn<NewTaskComponent> = (component) => {
  if(component.submit){
    return true;
  }
  if(component.enteredTitle() || component.enteredDate() || component.enteredSummary()){
    return window.confirm('Do you want to really leave? You will loose the entered data.');
  }
  return true;
}

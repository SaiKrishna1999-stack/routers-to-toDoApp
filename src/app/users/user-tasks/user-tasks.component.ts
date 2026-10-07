import { Component, input,inject, computed, Input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  // @Input() userid!: string;
  userName= '';
  private activatedRoute = inject(ActivatedRoute);
  private users = inject(UsersService);
  // get userName() {
  //   return this.users.users.find((user) => user.id === this.userid)?.name;
  // }

  ngOnInit() {
    console.log('Activated Route:', this.activatedRoute);
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.userName = this.users.users.find((user) => user.id === param.get('userid'))?.name || '';
      }
    })
  }
}

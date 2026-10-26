import { Component, input,inject, computed, Input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink, ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent{
  // @Input() userid!: string;
    message = input.required<string>();
    userName = input.required<string>();
  // userName= '';
  // private activatedRoute = inject(ActivatedRoute);
  // private users = inject(UsersService);

  // get userName() {
  //   return this.users.users.find((user) => user.id === this.userid)?.name;
  // }

  // ngOnInit() {
  //   console.log('Activated Route:', this.activatedRoute);
  //   this.activatedRoute.paramMap.subscribe({
  //     next: (param) => {
  //       this.userName = this.users.users.find((user) => user.id === param.get('userid'))?.name || '';
  //     }
  //   })
  // }

  // ngOnInit() {
  //   console.log('Activated Route:', this.activatedRoute);
  //   this.activatedRoute.data.subscribe({
  //     next: (data) => {
  //       console.log('Data from resolver:', data);
  //     }
  //   });
  // }
}

export const getUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const users = inject(UsersService);
  const userId = activatedRoute.paramMap.get('userid');
  const user = users.users.find((u) => u.id === userId);
  return user ? user.name : '';
}

export const resolveTitle: ResolveFn<string> = (activedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) => {
  return getUserName(activedRouteSnapshot, routerStateSnapshot) + "'s Tasks";
}

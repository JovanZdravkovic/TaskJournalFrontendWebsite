import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AuthGuard } from './services/auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { TaskHistoryComponent } from './pages/task-history/task-history.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { authRequired: false } },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard], data: { authRequired: false } },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard], data: { authRequired: true } },
  { path: 'task_history', component: TaskHistoryComponent, canActivate: [AuthGuard], data: { authRequired: true } },
  { path: 'new_task', component: NewTaskComponent, canActivate: [AuthGuard], data: { authRequired: true } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { authRequired: true } },
  { path: '',   redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', redirectTo: '/tasks' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

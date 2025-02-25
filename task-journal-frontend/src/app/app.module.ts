import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskHistoryComponent } from './pages/task-history/task-history.component';
import { HeaderComponent } from './components/header/header.component';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import {ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ConfirmPasswordDirective } from './utils/validators/utils/validators/confirm-password.directive';
import { IconComponent } from './components/icon/icon.component';
import { TaskRowComponent } from './components/task-row/task-row.component';
import { SelectComponent } from './components/select/select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskHistoryComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    ConfirmPasswordDirective,
    TaskRowComponent,
    NewTaskComponent,
    DatePickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    SelectComponent,
    IconComponent,
    FormsModule
],
  providers: [
    provideHttpClient(),
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

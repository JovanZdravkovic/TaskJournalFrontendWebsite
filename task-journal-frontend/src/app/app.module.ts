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

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskHistoryComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(),
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

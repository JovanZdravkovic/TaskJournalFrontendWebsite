import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'task-journal-frontend';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  get loggedIn(): boolean {
    return this.authService.loggedIn();
  }
}

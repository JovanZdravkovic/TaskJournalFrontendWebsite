import { Component } from '@angular/core';
import { taskIcons } from '../../components/select/select.constants';
import { BaseService } from '../../services/base/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  icons = taskIcons;

  constructor(
    private baseService: BaseService,
    private router: Router
  ) {}
}

import { Component } from '@angular/core';
import { taskIcons } from '../../components/select/select.constants';
import { BaseService } from '../../services/base/base.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  icons = taskIcons;
  taskForm = new FormGroup({
    taskName: new FormControl(null, Validators.required),
    taskIcon: new FormControl(null, Validators.required),
    taskDesc: new FormControl(null, Validators.required),
    taskStarred: new FormControl(false, Validators.required),
    deadline: new FormControl(null)
  });

  constructor(
    private baseService: BaseService,
    private router: Router
  ) {}

  createPayload(): any {
    let formPayload: any = {};
    Object.keys(this.taskForm.controls).forEach((controlName) => {
      formPayload[controlName] = this.taskForm.get(controlName)?.value;
    });
    return formPayload;
  }

  checkErrors(): boolean {
    // TODO: implement error checking logic
    return false;
  }

  createNewTask(): void {
    let errors: boolean = this.checkErrors();
    if(!errors) {
      this.baseService.post('tasks', this.createPayload())
      .pipe(
        catchError((error) => {
          return of(null);
        })
      )
      .subscribe((data) => {});
    }
  }

  getStarredControl() {
    return this.taskForm.get('taskStarred') as FormControl;
  }

  getDeadlineControl() {
    return this.taskForm.get('deadline') as FormControl;
  }
}

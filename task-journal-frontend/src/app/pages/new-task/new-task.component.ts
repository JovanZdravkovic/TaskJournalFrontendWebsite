import { Component } from '@angular/core';
import { taskIcons } from '../../components/select/select.constants';
import { BaseService } from '../../services/base/base.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
    starred: new FormControl(false, Validators.required),
    deadline: new FormControl(null)
  });

  constructor(
    private baseService: BaseService,
    private router: Router,
    private toastr: ToastrService
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
          this.toastr.error('Error while creating task', 'Error');
          return of(null);
        })
      )
      .subscribe((data) => {
        if(data.id !== null) {
          this.toastr.success('Successfully created task', 'Success');
          this.router.navigateByUrl('/tasks');
        }
      });
    }
  }

  getStarredControl() {
    return this.taskForm.get('starred') as FormControl;
  }

  getDeadlineControl() {
    return this.taskForm.get('deadline') as FormControl;
  }
}

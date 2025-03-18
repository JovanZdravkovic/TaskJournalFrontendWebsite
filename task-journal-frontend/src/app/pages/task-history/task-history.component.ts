import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { taskIcons } from '../../components/select/select.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../services/base/base.service';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrl: './task-history.component.scss'
})
export class TaskHistoryComponent {
  id: string | null = '';
  taskHistory: any = {};
  editMode: boolean = false;
  editForm: FormGroup | null = null;
  icons = taskIcons;
  getRatingControlCallback: Function = () => {};
  setRatingControlCallback: Function = () => {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private baseService: BaseService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  initEditForm(): void {
    this.editForm = new FormGroup({
      execComment: new FormControl(this.taskHistory.execComment, Validators.required),
      execRating: new FormControl(this.taskHistory.execRating, Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadTaskHistory();
    this.getRatingControlCallback = this.getRatingControl.bind(this);
    this.setRatingControlCallback = this.setRatingControl.bind(this);
  }

  loadTaskHistory(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id === null) {
      this.router.navigateByUrl('/tasks_history');
    }
    this.baseService.get('task_history/' + this.id)
    .pipe(
      catchError((error) => {
        return of(null);
      })
    )
    .subscribe((data) => {
      if(data) {
        this.taskHistory = data;
        this.initEditForm();
      } else {
        this.router.navigateByUrl('/tasks_history');
      }
    });
  }

  editTaskHistory(): void {
    this.editMode = !this.editMode;
    this.initEditForm();
  }

  createPayload(): any {
    let formPayload: any = {};
    Object.keys(this.editForm!.controls).forEach((controlName) => {
      formPayload[controlName] = this.editForm!.get(controlName)?.value;
    });
    return formPayload;
  }

  checkEditFormErrors(): boolean {
    // TODO: implement error checking logic
    return false;
  }

  updateTaskHistory(): void {
    let errors: boolean = this.checkEditFormErrors();
    if(!errors) {
      this.baseService.put('task_history/' + this.id, this.createPayload())
      .pipe(
        catchError((error) => {
          this.toastr.error('Error while updating task history', 'Error');
          return of(null);
        })
      )
      .subscribe((data) => {
        if(data.success) {
          this.toastr.success('Successfully updated task history', 'Success');
          this.editTaskHistory();
          this.loadTaskHistory();
        }
      });
    }
  }

  deleteTaskHistory(): void {
    if(confirm('Do you want to delete this task history?')) {
      this.baseService.delete('task_history/' + this.id)
      .pipe(
        catchError((error) => {
          this.toastr.error('Error while deleting task history', 'Error');
          return of(null);
        })
      )
      .subscribe((data) => {
        if(data.success) {
          this.toastr.success('Successfully deleted task history', 'Success');
          this.router.navigateByUrl('/tasks_history');
        }
      });
    }
  }

  getExecCommentControl() {
    return this.editForm!.get('execComment') as FormControl;
  }

  getRatingControl() {
    return this.editForm!.get('execRating') as FormControl;
  }

  setRatingControl(value: number) {
    let control = this.getRatingControl();
    if(value !== control.value) {
      control.setValue(value);
    } else {
      control.setValue(null);
    }
  }
}

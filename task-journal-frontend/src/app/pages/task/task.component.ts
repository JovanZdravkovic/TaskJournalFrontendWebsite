import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { BaseService } from '../../services/base/base.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { taskIcons } from '../../components/select/select.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  id: string | null = '';
  task: any = {};
  editMode: boolean = false;
  editForm: FormGroup | null = null;
  errorMap: Map<string, string> = new Map<string, string>();
  icons = taskIcons;

  constructor(
    private activatedRoute: ActivatedRoute,
    private baseService: BaseService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  initEditForm(): void {
    this.errorMap = new Map<string, string>();
    this.editForm = new FormGroup({
      taskName: new FormControl(this.task.taskName, [Validators.required, Validators.maxLength(50)]),
      taskIcon: new FormControl(this.task.taskIcon, Validators.required),
      taskDesc: new FormControl(this.task.taskDesc, [Validators.required, Validators.maxLength(500)]),
      starred: new FormControl(this.task.starred, Validators.required),
      deadline: new FormControl(this.task.deadline)
    });
  }

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id === null) {
      this.router.navigateByUrl('/tasks');
    }
    this.baseService.get('task/' + this.id)
    .pipe(
      catchError((error) => {
        return of(null);
      })
    )
    .subscribe((data) => {
      if(data) {
        this.task = data;
        this.initEditForm();
      } else {
        this.router.navigateByUrl('/tasks');
      }
    });
  }

  editTask(): void {
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
    let errorExist = false;
    Object.keys(this.editForm!.controls).forEach((controlName) => {
      if(this.editForm!.get(controlName)?.hasError('required')) {
        this.errorMap.set(controlName, 'required');
        errorExist = true;
      } else if(this.editForm!.get(controlName)?.hasError('maxlength')) {
        this.errorMap.set(controlName, 'maxlength');
        errorExist = true;
      } else {
        this.errorMap.set(controlName, '');
      }
    });
    return errorExist;
  }

  updateTask(): void {
    let errors: boolean = this.checkEditFormErrors();
    if(!errors) {
      this.baseService.put('task/update/' + this.id, this.createPayload())
      .pipe(
        catchError((error) => {
          this.toastr.error('Error while updating task', 'Error');
          return of(null);
        })
      )
      .subscribe((data) => {
        if(data.success) {
          this.toastr.success('Successfully updated task', 'Success');
          this.editTask();
          this.loadTask();
        }
      });
    } else {
      this.toastr.error('Invalid form', 'Error');
    }
  }

  deleteTask(): void {
    if(confirm('Do you want to delete this task?')) {
      this.baseService.delete('task/' + this.id)
      .pipe(
        catchError((error) => {
          this.toastr.error('Error while deleting task', 'Error');
          return of(null);
        })
      )
      .subscribe((data) => {
        if(data.success) {
          this.toastr.success('Successfully deleted task', 'Success');
          this.router.navigateByUrl('/tasks');
        }
      });
    }
  }

  getStarredControl() {
    return this.editForm!.get('starred') as FormControl;
  }

  getDeadlineControl() {
    return this.editForm!.get('deadline') as FormControl;
  }
  
  getDeadlineDay(): number | null {
    if(this.task.deadline) {
      const date = new Date(this.task.deadline);
      return date.getDate();
    } else {
      return null;
    }
  }

  getDeadlineMonth(): number | null {
    if(this.task.deadline) {
      const date = new Date(this.task.deadline);
      return date.getMonth() + 1;
    } else {
      return null;
    }
  }

  getDeadlineYear(): number | null {
    if(this.task.deadline) {
      const date = new Date(this.task.deadline);
      return date.getFullYear();
    } else {
      return null;
    }
  }

  getDeadlineHours(): number | null {
    if(this.task.deadline) {
      const date = new Date(this.task.deadline);
      return date.getHours();
    } else {
      return null;
    }
  } 

  getDeadlineMinutes(): number | null {
    if(this.task.deadline) {
      const date = new Date(this.task.deadline);
      return date.getMinutes();
    } else {
      return null;
    }
  }
}

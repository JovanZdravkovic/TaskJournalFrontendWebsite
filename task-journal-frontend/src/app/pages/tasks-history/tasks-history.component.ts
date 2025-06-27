import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { taskIcons } from '../../components/select/select.constants';
import { Router } from '@angular/router';
import { BaseService } from '../../services/base/base.service';
import { catchError, of } from 'rxjs';
import { OsCheckService } from '../../services/oscheck/os-check.service';

@Component({
  selector: 'app-tasks-history',
  templateUrl: './tasks-history.component.html',
  styleUrl: './tasks-history.component.scss'
})
export class TasksHistoryComponent implements OnInit {
  tasksHistory: any = [];
  filtersForm: FormGroup = new FormGroup({
    searchName: new FormControl(null), 
    searchIcons: new FormControl(null),
    searchRating: new FormControl(null)
  });
  icons = taskIcons;
  getTasksHistoryCallback: Function = () => {};
  getRatingControlCallback: Function = () => {};
  setRatingControlCallback: Function = () => {};

  constructor(
    private router: Router,
    private baseService: BaseService,
    private osCheck: OsCheckService
  ) {}

  ngOnInit(): void {
    this.osCheck.mobileCheck();
    this.getTasksHistoryCallback = this.getTasksHistory.bind(this);
    this.getRatingControlCallback = this.getRatingControl.bind(this);
    this.setRatingControlCallback = this.setRatingControl.bind(this);
    this.getTasksHistory();
  }

  getTasksHistory(): void {
    let queryParameters: any = {};
    Object.keys(this.filtersForm.controls).forEach((controlName) => {
      queryParameters[controlName] = this.filtersForm.get(controlName)?.value;
    });
    this.baseService.get('tasks_history', queryParameters)
    .pipe(
      catchError((error) => {
        return of(null);
      })
    )
    .subscribe((data) => {
      this.tasksHistory = data;
    });
  }

  getNameControl() {
    return this.filtersForm.get('searchName') as FormControl;
  }

  getIconsControl() {
    return this.filtersForm.get('searchIcons') as FormControl;
  }

  getRatingControl() {
    return this.filtersForm.get('searchRating') as FormControl;
  }

  setRatingControl(value: number) {
    let control = this.getRatingControl();
    if(value !== control.value) {
      control.setValue(value);
    } else {
      control.setValue(null);
    }
    this.getTasksHistory();
  }

  resetFilters(): void {
    let searchNameControl = this.getNameControl();
    let searchIconsControl = this.getIconsControl();
    let searchOrderByControl = this.getRatingControl();
    searchNameControl.setValue(null);
    searchIconsControl.setValue(null);
    searchOrderByControl.setValue(null);
    this.getTasksHistory();
  }
}

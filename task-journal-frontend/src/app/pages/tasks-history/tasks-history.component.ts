import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { taskIcons } from '../../components/select/select.constants';

@Component({
  selector: 'app-tasks-history',
  templateUrl: './tasks-history.component.html',
  styleUrl: './tasks-history.component.scss'
})
export class TasksHistoryComponent {
  tasks: any = [];
  filtersForm: FormGroup = new FormGroup({
    searchName: new FormControl(null), 
    searchIcons: new FormControl(null),
    searchRating: new FormControl(null)
  });
  icons = taskIcons;
  getTasksHistoryCallback: Function = () => {};

  getTasksHistory(): void {

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
    control.setValue(value);
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

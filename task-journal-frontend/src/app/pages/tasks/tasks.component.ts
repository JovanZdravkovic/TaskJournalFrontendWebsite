import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base/base.service';
import { taskIcons } from '../../components/select/select.constants';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{
  toggleView: boolean = false;
  tasks: any = [];
  filtersForm: FormGroup = new FormGroup({
    searchName: new FormControl(null), 
    searchIcons: new FormControl(null),
    searchOrderBy: new FormControl(null)
  });
  icons = taskIcons;
  completeTaskCallback: Function = () => {};
  getTasksCallback: Function = () => {};

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.getTasks();
    this.completeTaskCallback = this.completeTask.bind(this);
    this.getTasksCallback = this.getTasks.bind(this);
  }

  getTasks() {
    let queryParameters: any = {};
    Object.keys(this.filtersForm.controls).forEach((controlName) => {
      queryParameters[controlName] = this.filtersForm.get(controlName)?.value;
    });
    this.baseService.get("tasks", queryParameters).subscribe((data: any) => {
      this.tasks = data;
    });
  }

  completeTask(task: any) {
    if(task.id === null) {
      return ;
    }
    this.baseService.put("task/" + task.id).subscribe((data: any) => {
      if(data.success) {
        this.removeTask(task.id);
      }
    });
  }

  removeTask(taskId: any): void {
    let index = this.tasks.findIndex((task: any) => task.id === taskId);
    if(index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  getNameControl() {
    return this.filtersForm.get('searchName') as FormControl;
  }

  getIconsControl() {
    return this.filtersForm.get('searchIcons') as FormControl;
  }

  getOrderByControl() {
    return this.filtersForm.get('searchOrderBy') as FormControl;
  }

  setOrderByControl(value: string) {
    let control = this.getOrderByControl();
    control.setValue(value);
    this.getTasks();
  }
  
  resetFilters(): void {
    let searchNameControl = this.getNameControl();
    let searchIconsControl = this.getIconsControl();
    let searchOrderByControl = this.getOrderByControl();
    searchNameControl.setValue(null);
    searchIconsControl.setValue(null);
    searchOrderByControl.setValue(null);
    this.getTasks();
  }
}

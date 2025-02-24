import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base/base.service';
import { taskIcons } from '../../components/select/select.constants';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{
  toggleView: boolean = false;
  tasks: any = [];
  icons = taskIcons;
  completeTaskCallback: Function = () => {};

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.baseService.get("tasks").subscribe((data: any) => {
      this.tasks = data;
    });
    this.completeTaskCallback = this.completeTask.bind(this);
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

}

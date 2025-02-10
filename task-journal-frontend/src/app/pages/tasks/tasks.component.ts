import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base/base.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{
  tasks: any = [];

  constructor(private baseService: BaseService) {

  }

  ngOnInit(): void {
    this.baseService.get("tasks").subscribe((data: any) => {
      this.tasks = data;
      console.log(this.tasks);
    });
  }

}

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

  constructor(private baseService: BaseService) {

  }

  ngOnInit(): void {
    this.baseService.get("tasks").subscribe((data: any) => {
      this.tasks = data;
    });
  }

}

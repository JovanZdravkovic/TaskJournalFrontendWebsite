import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-row',
  templateUrl: './task-row.component.html',
  styleUrl: './task-row.component.scss'
})
export class TaskRowComponent {
  @Input() task: any = {};
}

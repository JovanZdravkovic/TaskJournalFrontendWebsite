import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { BaseService } from '../../services/base/base.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  id: string | null = '';
  task: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private baseService: BaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      } else {
        this.router.navigateByUrl('/tasks');
      }
    });
  }

  deleteTask(): void {
    if(confirm('Do you want to delete this task?')) {
      this.baseService.delete('task/' + this.id)
      .pipe(
        catchError((error) => {
          return of(null);
        })
      )
      .subscribe((data) => {
        if(data.success) {
          this.router.navigateByUrl('/tasks');
        }
      });
    }
  }
}

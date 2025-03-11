import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHistoryRowComponent } from './task-history-row.component';

describe('TaskHistoryRowComponent', () => {
  let component: TaskHistoryRowComponent;
  let fixture: ComponentFixture<TaskHistoryRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskHistoryRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskHistoryRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

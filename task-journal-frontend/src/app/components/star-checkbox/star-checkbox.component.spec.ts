import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarCheckboxComponent } from './star-checkbox.component';

describe('StarCheckboxComponent', () => {
  let component: StarCheckboxComponent;
  let fixture: ComponentFixture<StarCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

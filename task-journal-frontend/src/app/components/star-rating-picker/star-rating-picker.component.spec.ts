import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRatingPickerComponent } from './star-rating-picker.component';

describe('StarRatingPickerComponent', () => {
  let component: StarRatingPickerComponent;
  let fixture: ComponentFixture<StarRatingPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarRatingPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarRatingPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

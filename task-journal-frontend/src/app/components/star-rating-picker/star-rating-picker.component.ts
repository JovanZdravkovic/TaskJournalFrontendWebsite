import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-star-rating-picker',
  templateUrl: './star-rating-picker.component.html',
  styleUrl: './star-rating-picker.component.scss'
})
export class StarRatingPickerComponent {
  @Input() getRatingControl: Function = () => {};
  @Input() setRatingControl: Function = () => {};
  @Input() showLabel: boolean = true;
}

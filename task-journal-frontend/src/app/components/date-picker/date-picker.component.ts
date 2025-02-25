import { Component } from '@angular/core';
import { months } from '../select/select.constants';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {
  monthItems = months;
}

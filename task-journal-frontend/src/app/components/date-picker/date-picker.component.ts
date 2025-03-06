import { Component, Input } from '@angular/core';
import { months } from '../select/select.constants';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {
  @Input() day: number | string | null = null;
  @Input() month: number | null = null;
  @Input() year: number | string | null = null;
  @Input() hours: number | string | null = null;
  @Input() minutes: number | string | null = null;
  monthItems = months;
  @Input() control: FormControl | null = null;

  isValidDate(year: number, month: number, day: number): boolean {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  }

  checkError(): boolean {
    if(this.year === null || this.month === null || this.day === null || this.hours === null || this.minutes === null) {
      return true;
    }
    this.day = Number(this.day);
    this.year = Number(this.year);
    this.hours = Number(this.hours);
    this.minutes = Number(this.minutes);
    if(!Number.isInteger(this.year)) {
      return true;
    }
    if(!this.isValidDate(this.year, this.month, this.day)) {
      return true;
    }
    if(!Number.isInteger(this.hours) || (this.hours < 0 || this.hours > 23)) {
      return true;
    }
    if(!Number.isInteger(this.minutes) || (this.minutes < 0 || this.minutes > 59)) {
      return true;
    }
    return false;
  }

  setControlValue(): void {
    // Format variables for generating dateTimeString
    let dayString: string = this.day!.toString();
    let monthString: string = this.month!.toString();
    let yearString: string = this.year!.toString();
    let hoursString: string = this.hours!.toString();
    let minutesString: string = this.minutes!.toString();
    if(dayString.length === 1) {
      dayString = '0' + dayString;
    }
    if(monthString.length === 1) {
      monthString = '0' + monthString;
    }
    if(hoursString.length === 1) {
      hoursString = '0' + hoursString;
    }
    if(minutesString.length === 1) {
      minutesString = '0' + minutesString;
    }

    let dateTimeString: string = yearString + '-' + monthString + '-' + dayString + 'T' + hoursString + ':' + minutesString + ':00';
    const localDate = new Date(dateTimeString);
    this.control?.setValue(localDate.toISOString());
  }

  inputChange(): void {
    if(!this.checkError()) {
      this.setControlValue();
    } else {
      this.control?.setErrors({ 
        invalidDate: true
      });
    }
  }
}

import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-star-checkbox',
  templateUrl: './star-checkbox.component.html',
  styleUrl: './star-checkbox.component.scss'
})
export class StarCheckboxComponent {
  @Input() value: boolean = false;
  @Input() control: FormControl | null = null;
  @Input() title: string = 'Starred';

  toggleStarred(): void {
    this.value = !this.value;
    if(this.control !== null) {
      this.control.setValue(this.value);
    }
  }

}

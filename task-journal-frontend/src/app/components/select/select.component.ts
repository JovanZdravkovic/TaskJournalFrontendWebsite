import { Component, Input } from '@angular/core';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { IconComponent } from "../icon/icon.component";
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  imports: [
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    IconComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class SelectComponent {
  @Input() items: any[] = [];
  @Input() control: string = 'value';
  @Input() form: FormGroup = new FormGroup({
    value: new FormControl(null)
  });
  @Input() multiple: boolean = false;
  @Input() icons: boolean = false;
  @Input() placeholder: string = '';
  @Input() bindValue: string = 'id';
  @Input() bindLabel: string = 'label';
  @Input() clearable: boolean = true;
  @Input() searchable: boolean = true;
  @Input() changeCallbackFunction: Function = () => {};

  clearValue(id: any): void {
    let value: any[] = this.form.get(this.control)!.value;
    let index = value.indexOf(id);
    if(index !== -1) {
      value.splice(index, 1);
      this.form.patchValue({
        [this.control]: value
      });
    }
  }

  valueChange(): void {
    this.changeCallbackFunction();
  }
}

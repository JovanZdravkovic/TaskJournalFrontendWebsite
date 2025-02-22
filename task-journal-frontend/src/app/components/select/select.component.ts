import { Component, Input } from '@angular/core';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { IconComponent } from "../icon/icon.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    FormsModule
],
})
export class SelectComponent{
  @Input() items: any[] = [];
  @Input() value: any = null;
  @Input() multiple: boolean = false;
  @Input() icons: boolean = false;
  @Input() placeholder: string = '';
  @Input() bindValue: string = 'id';
  @Input() bindLabel: string = 'label';
}

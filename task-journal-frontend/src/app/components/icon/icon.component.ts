import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { taskIcons } from '../select/select.constants';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  imports: [CommonModule]
})
export class IconComponent {
  @Input() iconName: string = '';
  @Input() iconSize: string = '';
  @Input() titleString: string | null = null;

  findTitle(): string | null {
    if(this.titleString !== null) {
      return this.titleString;
    }
    let iconObj = taskIcons.find((icon) => icon.id === this.iconName);
    if(iconObj === undefined) {
      return null;
    } else {
      return iconObj.label; 
    }
  }
}

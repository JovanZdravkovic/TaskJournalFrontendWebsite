import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profile: any = {};
  editMode: boolean = false;
  editForm: FormGroup | null = null;
  selectedProfileIconName: string = '';

  initEditForm(): void {
      this.editForm = new FormGroup({
        username: new FormControl(this.profile.username, Validators.required),
        email: new FormControl(this.profile.email, Validators.required),
      });
    }

  editProfile(): void {
    this.editMode = !this.editMode;
    this.initEditForm();
  }

  updateProfile(): void {
    
  }

  selectedProfileIcon($event: any): void {
    this.selectedProfileIconName = $event.target.files[0].name;
  }
}

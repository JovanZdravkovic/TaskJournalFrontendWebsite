import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OsCheckService {

  constructor() { }

  mobileCheck(): void {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      alert("For mobile users we strongly recommend using the mobile app.");
    }
  }

}

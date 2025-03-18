import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  constructor(private router: Router) {}

  activeRoutes(routes: string[]): boolean {
    let truncatedRoute: string = this.router.url;
    let firstSignificantSlash: number = truncatedRoute.indexOf('/', 1);
    if(firstSignificantSlash !== -1) {
      truncatedRoute = truncatedRoute.substring(0, firstSignificantSlash);
    }
    return routes.some((route) => route === truncatedRoute);
  }
}

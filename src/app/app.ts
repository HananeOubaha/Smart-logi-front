import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/">SmartLogi <span class="text-warning">SDMS</span></a>
        <div class="navbar-nav">
          <a class="nav-link active" routerLink="/suivi">Suivi Colis</a>
          </div>
      </div>
    </nav>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class App {
  title = 'SmartLogi-Front';
}

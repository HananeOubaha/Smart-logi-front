import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4" *ngIf="showNavbar()">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/">SmartLogi <span class="text-warning">SDMS</span></a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" routerLink="/dashboard">Dashboard</a></li>
            <li class="nav-item" *ngIf="userRole === 'ROLE_MANAGER'">
              <a class="nav-link" routerLink="/livreurs">Livreurs</a>
            </li>
            <li class="nav-item" *ngIf="userRole === 'ROLE_MANAGER'">
              <a class="nav-link" routerLink="/clients">Clients</a>
            </li>
            <li class="nav-item" *ngIf="userRole === 'ROLE_MANAGER'">
              <a class="nav-link" routerLink="/zones">Zones</a>
            </li>

            <li class="nav-item" *ngIf="userRole === 'ROLE_CLIENT'">
              <a class="nav-link" routerLink="/nouveau-colis">Nouveau Colis</a>
            </li>
            <li class="nav-item"><a class="nav-link" routerLink="/suivi">Suivi Public</a></li>
          </ul>
          
          <div class="d-flex align-items-center gap-3">
             <span class="text-white small d-none d-md-inline" *ngIf="isLoggedIn()">
               <i class="bi bi-person-circle"></i> {{ userRole }}
             </span>
             <button *ngIf="isLoggedIn()" (click)="logout()" class="btn btn-outline-light btn-sm">
               Déconnexion
             </button>
             <a *ngIf="!isLoggedIn()" routerLink="/login" class="btn btn-light btn-sm px-3 fw-bold">Login</a>
          </div>
        </div>
      </div>
    </nav>

    <div class="container min-vh-100 pb-5">
      <router-outlet></router-outlet>
    </div>
  `
})
export class App {
  constructor(public authService: AuthService, private router: Router) { }

  get userRole() { return this.authService.getUserRole(); }

  isLoggedIn() { return this.authService.isLoggedIn(); }

  showNavbar() {
    const hiddenIn = ['/login', '/register'];
    return !hiddenIn.includes(this.router.url);
  }

  logout() {
    this.authService.logout();
  }
}


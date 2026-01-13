import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, AuthResponse } from '../models/auth.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ⚠️ T-akkdi men l'URL f'Backend: wach /api/auth awla /api/v1/auth ?
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  // Méthode Login
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          // Khbbi l'Token (accessToken)
          if (response.accessToken) {
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('role', 'ADMIN'); // (Optionnel) Ila bghiti t-khbbi l'role hna
          }
        })
      );
  }

  // Logout: M7i Token o rje3 l'Login
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  // Check wach connecti
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Jib l'Token (ghadi n-7tajoh f'Interceptors)
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

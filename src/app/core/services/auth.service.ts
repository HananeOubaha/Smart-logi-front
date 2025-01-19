import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginRequest, AuthResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) { }


  // ==========================================
  // 1. LOGIN
  // ==========================================
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.accessToken) {
            // Stocker le token seulement
            localStorage.setItem('token', response.accessToken);
            console.log("✅ Login Réussi! Token stocké.");
          }
        })
      );
  }

  // ==========================================
  // 2. LOGOUT
  // ==========================================
  logout(): void {
    localStorage.removeItem('token');
    // Ila knti mkhbya chi haja akhra m7iha hna
    this.router.navigate(['/login']);
  }

  // ==========================================
  // 3. UTILS (IsLoggedIn, GetToken)
  // ==========================================
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ==========================================
  // 4. GET USER ROLE (VERSION CORRIGÉE 🛠️)
  // ==========================================
  getUserRole(): string {
    const token = this.getToken();
    if (!token) return '';

    try {
      // 1. Décodage du Payload (Partie milieu du JWT)
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const parsedJson = JSON.parse(decodedPayload);

      // 👇 DEBUG: Choufi had l'message f'Console (F12) bach t3rfi chno kayn
      console.log("🔍 TOKEN DECODÉ (Payload):", parsedJson);

      // CAS 1: Format Standard "roles" (Array de Strings ou String)
      if (parsedJson.roles) {
        if (Array.isArray(parsedJson.roles)) return parsedJson.roles[0];
        return parsedJson.roles;
      }

      // CAS 2: Format Spring Security "authorities"
      if (parsedJson.authorities && Array.isArray(parsedJson.authorities)) {
        const firstAuth = parsedJson.authorities[0];
        if (typeof firstAuth === 'object' && firstAuth.authority) {
          return firstAuth.authority;
        }
        return firstAuth.toString();
      }

      // CAS 3: Format "sub" ou "role" unique
      if (parsedJson.role) return parsedJson.role;
      if (parsedJson.scopes && Array.isArray(parsedJson.scopes)) return parsedJson.scopes[0];

      console.warn("⚠️ Aucun rôle trouvé dans le token !");
      return '';

    } catch (e) {
      console.error("❌ Erreur décodage token:", e);
      return '';
    }
  }

  // ==========================================
  // 5. GET USER ID
  // ==========================================
  getUserId(): string {
    const token = this.getToken();
    if (!token) return '';

    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const parsedJson = JSON.parse(decodedPayload);

      // Le backend stocke souvent l'ID dans le champ "id" ou "sub"
      return parsedJson.id || parsedJson.sub || '';
    } catch (e) {
      return '';
    }
  }
}


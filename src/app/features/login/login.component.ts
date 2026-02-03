import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'; // T-akkdi mn chemin
import { LoginRequest } from '../../core/models/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Darouri lil-formulaire
  templateUrl: './login.component.html'
})
export class LoginComponent {
  // L'objet li gha-i-3mmer l'user
  credentials: LoginRequest = {
    username: '', // Hna username kima bghiti
    password: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Identifiants incorrects ou erreur serveur.';
        console.error("❌ Détails de l'erreur de connexion:", err);
        if (err.status === 0) {
          this.errorMessage = "Le serveur est injoignable. Vérifiez qu'il est bien démarré.";
        } else if (err.status === 401) {
          this.errorMessage = "Email/Username ou Mot de passe incorrect.";
        }
      }

    });
  }
}

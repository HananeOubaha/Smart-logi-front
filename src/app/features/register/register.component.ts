import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    client = {
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
        motDePasse: '' // Attention: le backend peut attendre 'password' ou 'motDePasse'
    };

    isLoading = false;
    errorMessage = '';

    constructor(private http: HttpClient, private router: Router) { }

    onRegister() {
        this.isLoading = true;
        this.errorMessage = '';

        this.http.post(`${environment.apiUrl}/clients-expediteurs`, this.client).subscribe({
            next: () => {
                this.isLoading = false;
                alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
                this.router.navigate(['/login']);
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = "Une erreur est survenue lors de l'inscription.";
                console.error(err);
            }
        });
    }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-colis-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './colis-add.component.html',
  styleUrls: ['./colis-add.component.css']
})
export class ColisAddComponent {

  // Hado huma l'données li ghadi n-sifto l'Backend
  colis = {
    description: '',
    poids: null,
    villeDestination: '',
    clientExpediteurId: '' as any, // On va le remplir dynamiquement
    destinataireId: 1,     // Khass ikoun 3ndk destinataire b ID 1 f DB
    zoneId: 1              // Khass ikoun 3ndk zone b ID 1 f DB
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    // Récupérer l'ID de l'utilisateur connecté
    const userId = this.authService.getUserId();
    if (userId) {
      this.colis.clientExpediteurId = userId;
    }
  }

  onSubmit() {
    console.log("Envoi du colis...", this.colis);

    this.http.post(`${environment.apiUrl}/colis`, this.colis).subscribe({
      next: (res) => {
        alert("Colis créé avec succès ! 🚀");
        this.router.navigate(['/dashboard']); // Reje3 l'dashboard
      },
      error: (err) => {
        console.error(err);
        alert("Erreur: Vérifiez que vous êtes CONNECTÉ en tant que CLIENT (Pas Manager) et que les IDs existent.");
      }
    });
  }
}

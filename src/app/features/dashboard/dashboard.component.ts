import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  colisList: any[] = [];
  filteredColis: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  userRole: string = '';

  // Filtres
  filterStatus: string = '';
  filterSearch: string = '';


  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private detector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    console.log("🚀 Composant Dashboard initialisé. Rôle détecté:", this.userRole);

    this.errorMessage = '';
    this.isLoading = true;

    if (this.userRole === 'ROLE_CLIENT') {
      this.getMyColis();
    } else if (this.userRole === 'ROLE_DELIVERYMAN') {
      this.getDeliverymanColis();
    } else if (this.userRole === 'ROLE_MANAGER' || this.userRole === 'ROLE_ADMIN') {
      this.getAllColis();
    } else {
      console.warn("⚠️ Rôle non reconnu ou vide, tentative chargement Admin par défaut.");
      this.getAllColis();
    }
  }

  applyFilters() {
    this.filteredColis = this.colisList.filter(c => {
      const matchStatus = !this.filterStatus || c.statut === this.filterStatus;
      const matchSearch = !this.filterSearch ||
        c.description.toLowerCase().includes(this.filterSearch.toLowerCase()) ||
        c.villeDestination.toLowerCase().includes(this.filterSearch.toLowerCase());
      return matchStatus && matchSearch;
    });
  }

  getDeliverymanColis() {
    // Supposons un endpoint pour le livreur
    this.http.get<any[]>(`${environment.apiUrl}/colis/mes-tournees`).subscribe({
      next: (data) => {
        this.colisList = data;
        this.applyFilters();
        this.isLoading = false;
        this.detector.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Erreur chargement tournées";
        this.isLoading = false;
        this.detector.detectChanges();
      }
    });
  }


  // Jib Kolchi (Admin)
  getAllColis() {
    this.http.get<any[]>(`${environment.apiUrl}/colis`).subscribe({
      next: (data) => {
        this.colisList = data;
        this.applyFilters();
        this.isLoading = false;
        this.detector.detectChanges();
      },

      error: (err) => {
        console.error(err);
        this.errorMessage = "Erreur chargement (Admin)";
        this.isLoading = false;
        this.detector.detectChanges();
      }
    });
  }

  // Jib Dyali (Client)
  getMyColis() {
    this.http.get<any[]>(`${environment.apiUrl}/colis/mes-colis`).subscribe({
      next: (data) => {
        this.colisList = data;
        this.applyFilters();
        this.isLoading = false;
        this.detector.detectChanges();
      },

      error: (err) => {
        console.error(err);
        this.errorMessage = "Erreur chargement (Client)";
        this.isLoading = false;
        this.detector.detectChanges();
      }
    });
  }

  getStatusBadge(statut: string): string {
    switch (statut) {
      case 'CREE': return 'badge bg-secondary';
      case 'COLLECTE': return 'badge bg-info text-dark';
      case 'EN_STOCK': return 'badge bg-dark';
      case 'EN_TRANSIT': return 'badge bg-primary';
      case 'EN_TOURNEE': return 'badge bg-warning text-dark';
      case 'LIVRE': return 'badge bg-success';
      case 'ANNULE': return 'badge bg-danger';
      case 'ECHEC_LIVRAISON': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  updateStatus(colisId: any) {
    const newStatus = prompt("Nouveau statut (COLLECTE, EN_STOCK, EN_TRANSIT, EN_TOURNEE, LIVRE, ECHEC_LIVRAISON):");
    if (!newStatus) return;

    this.http.put(`${environment.apiUrl}/colis/statut/${colisId}?statut=${newStatus.toUpperCase()}`, {}).subscribe({
      next: () => {
        alert("Statut mis à jour !");
        this.ngOnInit();
      },
      error: (err) => alert("Erreur lors de la mise à jour")
    });
  }


  deleteColis(id: string) {
    if (confirm("Voulez-vous vraiment supprimer ce colis ?")) {
      this.http.delete(`${environment.apiUrl}/colis/${id}`).subscribe({
        next: () => {
          this.colisList = this.colisList.filter(c => c.id !== id);
        },
        error: (err) => {
          alert("Seul le manager peut supprimer !");
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

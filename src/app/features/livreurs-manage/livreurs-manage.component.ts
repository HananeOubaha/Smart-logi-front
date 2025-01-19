import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-livreurs-manage',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './livreurs-manage.component.html'
})
export class LivreursManageComponent implements OnInit {
    livreurs: any[] = [];
    isLoading = true;

    newLivreur = {
        nom: '',
        prenom: '',
        email: '',
        telephone: ''
    };

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.loadLivreurs();
    }

    loadLivreurs() {
        this.http.get<any[]>(`${environment.apiUrl}/livreurs`).subscribe({
            next: (data) => {
                this.livreurs = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    addLivreur() {
        this.http.post(`${environment.apiUrl}/livreurs`, this.newLivreur).subscribe({
            next: () => {
                this.loadLivreurs();
                this.newLivreur = { nom: '', prenom: '', email: '', telephone: '' };
                alert("Livreur ajouté !");
            },
            error: (err) => alert("Erreur lors de l'ajout")
        });
    }
}

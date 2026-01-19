import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-clients-manage',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './clients-manage.component.html'
})
export class ClientsManageComponent implements OnInit {
    clients: any[] = [];
    isLoading = true;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.loadClients();
    }

    loadClients() {
        this.http.get<any[]>(`${environment.apiUrl}/clients-expediteurs`).subscribe({
            next: (data) => {
                this.clients = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    deleteClient(id: any) {
        if (confirm("Supprimer ce client ?")) {
            this.http.delete(`${environment.apiUrl}/clients-expediteurs/${id}`).subscribe({
                next: () => this.loadClients(),
                error: (err) => alert("Erreur suppression")
            });
        }
    }
}

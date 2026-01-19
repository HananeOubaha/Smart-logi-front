import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-zones-manage',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './zones-manage.component.html'
})
export class ZonesManageComponent implements OnInit {
    zones: any[] = [];
    isLoading = true;
    newZone = { nom: '' };

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.loadZones();
    }

    loadZones() {
        this.http.get<any[]>(`${environment.apiUrl}/zones`).subscribe({
            next: (data) => {
                this.zones = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    addZone() {
        this.http.post(`${environment.apiUrl}/zones`, this.newZone).subscribe({
            next: () => {
                this.loadZones();
                this.newZone = { nom: '' };
            },
            error: (err) => alert("Erreur lors de l'ajout")
        });
    }
}

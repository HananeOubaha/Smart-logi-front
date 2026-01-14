import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColisService } from '../../core/services/colis.service';

@Component({
  selector: 'app-suivi-colis',
  standalone: true,
  imports: [CommonModule, FormsModule], // Darouri bach l'HTML i-chouf [(ngModel)] o *ngIf
  templateUrl: './suivi-colis.component.html',
  styleUrls: ['./suivi-colis.component.css']
})
export class SuiviColisComponent {
  // Had l'variables khass ssmmiathom ikounu b7al li f'l'HTML b'dabt
  colisId: string = '';
  colisData: any = null;
  errorMsg: string = '';

  constructor(private colisService: ColisService) {}

  // Had l'function hiya li f'l'bouton (click)="rechercher()"
  rechercher() {
    if (!this.colisId) {
      this.errorMsg = 'Veuillez entrer un ID.';
      return;
    }

    this.colisService.getColisById(this.colisId).subscribe({
      next: (res) => {
        this.colisData = res;
        this.errorMsg = '';
      },
      error: (err) => {
        this.errorMsg = 'Colis introuvable !';
        this.colisData = null;
      }
    });
  }
}

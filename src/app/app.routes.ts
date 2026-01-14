import { Routes } from '@angular/router';
import { SuiviColisComponent } from './features/suivi-colis/suivi-colis.component';
import { LoginComponent } from './features/login/login'; // Importiha
import { DashboardComponent } from './features/dashboard/dashboard';

export const routes: Routes = [
  { path: 'suivi', component: SuiviColisComponent },
  { path: 'login', component: LoginComponent }, // <--- Zidi hadi
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'suivi', pathMatch: 'full' }
];

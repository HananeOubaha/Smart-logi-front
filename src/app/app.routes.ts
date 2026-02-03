import { Routes } from '@angular/router';
import { SuiviColisComponent } from './features/suivi-colis/suivi-colis.component';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ColisAddComponent } from './features/colis-add/colis-add.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { RegisterComponent } from './features/register/register.component';
import { LivreursManageComponent } from './features/livreurs-manage/livreurs-manage.component';
import { ClientsManageComponent } from './features/clients-manage/clients-manage.component';
import { ZonesManageComponent } from './features/zones-manage/zones-manage.component';

export const routes: Routes = [
  { path: 'suivi', component: SuiviColisComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'livreurs',
    component: LivreursManageComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'ROLE_MANAGER' }
  },
  {
    path: 'clients',
    component: ClientsManageComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'ROLE_MANAGER' }
  },
  {
    path: 'zones',
    component: ZonesManageComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'ROLE_MANAGER' }
  },


  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'nouveau-colis',
    component: ColisAddComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'ROLE_CLIENT' }
  },
  { path: '', redirectTo: 'suivi', pathMatch: 'full' }
];

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailAnnonceComponent } from './detail-annonce/detail-annonce.component';
import { ModifierAnnonceComponent } from './modifier-annonce/modifier-annonce.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detailAnnonce/:id', component: DetailAnnonceComponent },
  { path: 'modifierAnnonce/:id', component: ModifierAnnonceComponent }
];


import { Routes } from '@angular/router';
import { HealthCheckComponent } from './pages/health-check/health-check.component';

export const routes: Routes = [
  {
    path: '',
    component: HealthCheckComponent,
    title: 'Health Check | Smart Inventory Tracker'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

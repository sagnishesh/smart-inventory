import { Routes } from '@angular/router';

import { HealthCheckComponent } from './pages/health-check/health-check.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { InventoryPageComponent } from './features/inventory/inventory-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: HealthCheckComponent,
    title: 'Health Check | Smart Inventory Tracker'
  },
  {
    path: 'inventory',
    canActivate: [authGuard],
    component: InventoryPageComponent,
    title: 'Inventory | Smart Inventory Tracker'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Sign In | Smart Inventory Tracker'
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Create Account | Smart Inventory Tracker'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

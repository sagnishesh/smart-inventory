import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import { authActions } from './store/auth/auth.actions';
import { selectAuthUser, selectIsAuthenticated } from './store/auth/auth.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private readonly store = inject(Store);

  readonly user = this.store.selectSignal(selectAuthUser);
  readonly isAuthenticated = this.store.selectSignal(selectIsAuthenticated);

  signOut(): void {
    this.store.dispatch(authActions.logout());
  }
}

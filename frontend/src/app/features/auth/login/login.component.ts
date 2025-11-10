import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';

import { authActions } from '../../../store/auth/auth.actions';
import { selectAuthError, selectAuthStatus } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);

  readonly status = this.store.selectSignal(selectAuthStatus);
  readonly error = this.store.selectSignal(selectAuthError);
  readonly hidePassword = signal(true);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  submit(): void {
    if (this.form.invalid || this.status() === 'loading') {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      authActions.login({
        credentials: {
          email: this.form.value.email?.trim() ?? '',
          password: this.form.value.password ?? ''
        }
      })
    );
  }
}


import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';

import { authActions } from '../../../store/auth/auth.actions';
import { selectAuthError, selectAuthStatus } from '../../../store/auth/auth.selectors';
import { UserRole } from '../../../core/types/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);

  readonly status = this.store.selectSignal(selectAuthStatus);
  readonly error = this.store.selectSignal(selectAuthError);
  readonly hidePassword = signal(true);

  readonly roles: UserRole[] = ['ADMIN', 'STAFF'];

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['STAFF' as UserRole, [Validators.required]]
  });

  submit(): void {
    if (this.form.invalid || this.status() === 'loading') {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      authActions.register({
        payload: {
          email: this.form.value.email?.trim() ?? '',
          password: this.form.value.password ?? '',
          role: this.form.value.role
        }
      })
    );
  }
}


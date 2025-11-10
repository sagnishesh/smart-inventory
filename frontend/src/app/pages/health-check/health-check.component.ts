import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';

import { HealthService, HealthStatus } from '../../core/services/health.service';
import { selectAuthUser } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-health-check',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './health-check.component.html',
  styleUrl: './health-check.component.scss'
})
export class HealthCheckComponent {

  private readonly healthService = inject(HealthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);

  readonly loading = signal(false);
  readonly status = signal<HealthStatus | null>(null);
  readonly error = signal<string | null>(null);
  readonly currentUser = this.store.selectSignal(selectAuthUser);

  constructor() {
    this.runHealthCheck();
  }

  runHealthCheck(): void {
    this.loading.set(true);
    this.error.set(null);

    this.healthService
      .checkHealth()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (response) => this.status.set(response),
        error: () => this.error.set('Unable to reach the backend service.')
      });
  }
}

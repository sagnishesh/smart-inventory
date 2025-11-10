import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { selectAuthStatus, selectIsAuthenticated } from '../../store/auth/auth.selectors';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return combineLatest([
    store.select(selectIsAuthenticated),
    store.select(selectAuthStatus)
  ]).pipe(
    filter(([, status]) => status !== 'loading'),
    take(1),
    map(([isAuthenticated]) => {
      if (isAuthenticated) {
        return true;
      }
      return router.createUrlTree(['auth', 'login']);
    })
  );
};


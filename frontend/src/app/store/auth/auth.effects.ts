import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';
import { AuthStorageService } from '../../core/services/auth-storage.service';
import { authActions } from './auth.actions';

@Injectable()
export class AuthEffects {

  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly authStorage = inject(AuthStorageService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.init),
      exhaustMap(() => {
        const token = this.authStorage.getToken();

        if (!token) {
          return of(authActions.initCompleted({ token: null, user: null }));
        }

        return this.authService.fetchCurrentUser().pipe(
          map((user) => authActions.initCompleted({ token, user })),
          catchError(() => {
            this.authStorage.setToken(null);
            return of(
              authActions.initFailure({
                error: 'Your session expired. Please sign in again.'
              })
            );
          })
        );
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((response) => authActions.loginSuccess({ response })),
          catchError((error) =>
            of(
              authActions.loginFailure({
                error: this.extractErrorMessage(error, 'Unable to sign in. Please verify your credentials.')
              })
            )
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      switchMap(({ payload }) =>
        this.authService.register(payload).pipe(
          map((response) => authActions.registerSuccess({ response })),
          catchError((error) =>
            of(
              authActions.registerFailure({
                error: this.extractErrorMessage(error, 'Registration failed. Try a different email address.')
              })
            )
          )
        )
      )
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess, authActions.registerSuccess),
        tap(({ response }) => {
          this.authStorage.setToken(response.token);
          this.router.navigateByUrl('/');
          this.snackBar.open(`Welcome, ${response.user.email}!`, 'Dismiss', {
            duration: 3500
          });
        })
      ),
    { dispatch: false }
  );

  authFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginFailure, authActions.registerFailure, authActions.initFailure),
        tap(({ error }) => {
          this.snackBar.open(error, 'Dismiss', {
            duration: 4000
          });
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap(() => {
          this.authStorage.setToken(null);
          this.router.navigate(['auth', 'login']);
        })
      ),
    { dispatch: false }
  );

  private extractErrorMessage(error: unknown, fallback: string): string {
    if (error && typeof error === 'object' && 'error' in error) {
      const err = (error as { error?: unknown }).error;
      if (err && typeof err === 'object' && 'message' in err) {
        const message = (err as { message?: unknown }).message;
        if (typeof message === 'string' && message.trim().length > 0) {
          return message;
        }
      }
    }
    return fallback;
  }
}


import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';

import { InventoryService } from '../../core/services/inventory.service';
import { inventoryActions } from './inventory.actions';

@Injectable()
export class InventoryEffects {

  private readonly actions$ = inject(Actions);
  private readonly inventoryService = inject(InventoryService);
  private readonly snackBar = inject(MatSnackBar);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventoryActions.loadItems),
      exhaustMap(() =>
        this.inventoryService.list().pipe(
          map((items) => inventoryActions.loadItemsSuccess({ items })),
          catchError((error) =>
            of(
              inventoryActions.loadItemsFailure({
                error: this.extractError(error, 'Failed to load inventory items.')
              })
            )
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventoryActions.createItem),
      mergeMap(({ payload }) =>
        this.inventoryService.create(payload).pipe(
          map((item) => inventoryActions.createItemSuccess({ item })),
          catchError((error) =>
            of(
              inventoryActions.createItemFailure({
                error: this.extractError(error, 'Unable to create inventory item.')
              })
            )
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventoryActions.updateItem),
      mergeMap(({ id, payload }) =>
        this.inventoryService.update(id, payload).pipe(
          map((item) => inventoryActions.updateItemSuccess({ item })),
          catchError((error) =>
            of(
              inventoryActions.updateItemFailure({
                error: this.extractError(error, 'Unable to update inventory item.')
              })
            )
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventoryActions.deleteItem),
      mergeMap(({ id }) =>
        this.inventoryService.delete(id).pipe(
          map(() => inventoryActions.deleteItemSuccess({ id })),
          catchError((error) =>
            of(
              inventoryActions.deleteItemFailure({
                error: this.extractError(error, 'Unable to delete inventory item.')
              })
            )
          )
        )
      )
    )
  );

  successNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          inventoryActions.createItemSuccess,
          inventoryActions.updateItemSuccess,
          inventoryActions.deleteItemSuccess
        ),
        tap(({ type }) => {
          const message =
            type === inventoryActions.createItemSuccess.type
              ? 'Inventory item created.'
              : type === inventoryActions.updateItemSuccess.type
              ? 'Inventory item updated.'
              : 'Inventory item removed.';
          this.snackBar.open(message, 'Dismiss', { duration: 3000 });
        })
      ),
    { dispatch: false }
  );

  failureNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          inventoryActions.loadItemsFailure,
          inventoryActions.createItemFailure,
          inventoryActions.updateItemFailure,
          inventoryActions.deleteItemFailure
        ),
        tap(({ error }) => {
          this.snackBar.open(error, 'Dismiss', { duration: 4000 });
        })
      ),
    { dispatch: false }
  );

  private extractError(error: unknown, fallback: string): string {
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


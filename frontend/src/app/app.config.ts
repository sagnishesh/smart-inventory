import { ApplicationConfig, APP_INITIALIZER, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { Store } from '@ngrx/store';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { authFeature } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { authActions } from './store/auth/auth.actions';
import { inventoryFeature } from './store/inventory/inventory.reducer';
import { InventoryEffects } from './store/inventory/inventory.effects';

function initAuthFactory(store: Store) {
  return () => {
    store.dispatch(authActions.init());
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    provideStore(),
    provideState(authFeature),
    provideState(inventoryFeature),
    provideEffects(AuthEffects, InventoryEffects),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuthFactory,
      deps: [Store],
      multi: true
    }
  ]
};

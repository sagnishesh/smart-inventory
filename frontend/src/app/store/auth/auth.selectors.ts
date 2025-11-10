import { createSelector } from '@ngrx/store';

import { authFeature } from './auth.reducer';

export const selectAuthState = authFeature.selectAuthState;

export const selectAuthUser = authFeature.selectUser;

export const selectAuthToken = authFeature.selectToken;

export const selectAuthStatus = authFeature.selectStatus;

export const selectAuthError = authFeature.selectError;

export const selectIsAuthenticated = createSelector(
  selectAuthUser,
  selectAuthToken,
  (user, token) => Boolean(user && token)
);


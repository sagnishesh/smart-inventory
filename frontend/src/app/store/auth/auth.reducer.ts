import { createFeature, createReducer, on } from '@ngrx/store';

import { authActions } from './auth.actions';
import { User } from '../../core/types/user.model';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';

export interface AuthState {
  user: User | null;
  token: string | null;
  status: AuthStatus;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.init, (state) => ({
      ...state,
      status: 'loading' as AuthStatus,
      error: null
    })),
    on(authActions.initCompleted, (state, { token, user }) => ({
      ...state,
      token,
      user,
      status: (token && user ? 'authenticated' : 'idle') as AuthStatus,
      error: null
    })),
    on(authActions.initFailure, (state, { error }) => ({
      ...state,
      user: null,
      token: null,
      status: 'idle' as AuthStatus,
      error
    })),
    on(authActions.login, authActions.register, (state) => ({
      ...state,
      status: 'loading' as AuthStatus,
      error: null
    })),
    on(authActions.loginSuccess, authActions.registerSuccess, (state, { response }) => ({
      ...state,
      user: response.user,
      token: response.token,
      status: 'authenticated' as AuthStatus,
      error: null
    })),
    on(authActions.loginFailure, authActions.registerFailure, (state, { error }) => ({
      ...state,
      status: 'error' as AuthStatus,
      error
    })),
    on(authActions.logout, () => ({
      ...initialState
    })),
    on(authActions.clearError, (state) => ({
      ...state,
      error: null,
      status: state.status === 'error' ? ('idle' as AuthStatus) : state.status
    }))
  )
});


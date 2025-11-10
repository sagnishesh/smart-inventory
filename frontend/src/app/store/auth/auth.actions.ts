import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { AuthResponse, LoginRequest, RegisterRequest } from '../../core/types/auth.model';
import { User } from '../../core/types/user.model';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Init: emptyProps(),
    'Init Completed': props<{ token: string | null; user: User | null }>(),
    'Init Failure': props<{ error: string }>(),
    Login: props<{ credentials: LoginRequest }>(),
    'Login Success': props<{ response: AuthResponse }>(),
    'Login Failure': props<{ error: string }>(),
    Register: props<{ payload: RegisterRequest }>(),
    'Register Success': props<{ response: AuthResponse }>(),
    'Register Failure': props<{ error: string }>(),
    Logout: emptyProps(),
    'Clear Error': emptyProps()
  }
});


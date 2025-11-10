import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthStorageService } from '../services/auth-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStorage = inject(AuthStorageService);
  const token = authStorage.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};


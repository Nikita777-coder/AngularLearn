import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { CommonFunctions } from '../commons';

export const httpHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const commonFunctions = inject(CommonFunctions);

  if (req.url.toLowerCase().includes('token')) {
    return next(req); 
  }

  return commonFunctions.getToken().pipe(
    switchMap(token => {
      const authReq = req.clone({
        headers: req.headers
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
      });
      return next(authReq);
    })
  );
};

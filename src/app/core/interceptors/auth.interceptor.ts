import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Njibou Token men l'khzna
  const token = localStorage.getItem('token');

  // 2. Ila kan Token, n-lss9ouh f'l'Header
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  // 3. Ila makan walou, doz kima nti
  return next(req);
};

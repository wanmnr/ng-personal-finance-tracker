// src/app/core/interceptors/http2.interceptor.ts
// Functional Interceptor (New in Angular 18)
import { HttpInterceptorFn } from "@angular/common/http";

export const simpleHttpInterceptor: HttpInterceptorFn = (request, next) => {
  const transformedRequest = request.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'API-Version': '1.0'
    }
  });
  return next(transformedRequest);
};

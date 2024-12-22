// core/interceptors/cache.interceptor.ts
// Functional Interceptor (New in Angular 18)
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

// Cache store outside the interceptor function
const cache = new Map<string, any>();

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next(req);
  }

  const cachedResponse = cache.get(req.url);
  if (cachedResponse) {
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cache.set(req.url, event);
      }
    })
  );
};

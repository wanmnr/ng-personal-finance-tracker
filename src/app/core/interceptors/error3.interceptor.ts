// core/interceptors/error3.interceptor.ts
// Functional Interceptor (New in Angular 18)
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          toastr.error('Please login to continue');
          router.navigate(['/login']);
          break;

        case 403:
          toastr.error('You do not have permission to perform this action');
          break;

        case 404:
          toastr.error('Resource not found');
          router.navigate(['/not-found']);
          break;

        case 400:
          if (error.error?.errors) {
            const modelStateErrors = [];
            for (const key in error.error.errors) {
              modelStateErrors.push(error.error.errors[key]);
            }
            throw modelStateErrors.flat();
          } else {
            toastr.error(error.error?.message || 'Bad Request');
          }
          break;

        case 500:
          toastr.error('Internal server error');
          router.navigate(['/server-error'], {
            state: { error: error.error }
          });
          break;

        default:
          toastr.error('Something unexpected went wrong');
          console.error('An error occurred:', error);
          break;
      }
      return throwError(() => error);
    })
  );
};

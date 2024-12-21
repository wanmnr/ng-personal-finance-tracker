// core/interceptors/error4.interceptor.ts
// Traditional Class-Based Interceptor
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.toastr.error('Please login to continue');
            this.router.navigate(['/login']);
            break;

          case 403:
            this.toastr.error('You do not have permission to perform this action');
            break;

          case 404:
            this.toastr.error('Resource not found');
            this.router.navigate(['/not-found']);
            break;

          case 400:
            if (error.error?.errors) {
              const modelStateErrors = [];
              for (const key in error.error.errors) {
                modelStateErrors.push(error.error.errors[key]);
              }
              throw modelStateErrors.flat();
            } else {
              this.toastr.error(error.error?.message || 'Bad Request');
            }
            break;

          case 500:
            this.toastr.error('Internal server error');
            this.router.navigate(['/server-error'], {
              state: { error: error.error }
            });
            break;

          default:
            this.toastr.error('Something unexpected went wrong');
            console.error('An error occurred:', error);
            break;
        }
        return throwError(() => error);
      })
    );
  }
}

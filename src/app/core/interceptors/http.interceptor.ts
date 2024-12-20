// core/interceptor/http.interceptor.ts
// Class-based Interceptor (Traditional)
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Transform request
    const transformedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'API-Version': '1.0'
      },
      body: this.transformRequestBody(request.body)
    });

    return next.handle(transformedRequest);
  }

  private transformRequestBody(body: any): any {
    if (!body) return body;
    // Implement custom transformation logic
    return {
      ...body,
      timestamp: new Date().toISOString()
    };
  }
}


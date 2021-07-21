import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()


export class ErrorHandingInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  // use interceptor to handle error globally
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 500:
            this.router.navigate(['/error'], { queryParams: { errorMsg: err?.error?.message } });
            break;
          case 404:
            this.router.navigate(['/error'], { queryParams: { errorMsg: err?.error?.message } });
            break;
          case 400:
            this.router.navigate(['/error'], { queryParams: { errorMsg: err?.error?.message } });
            break;
          case 401:
            this.router.navigate(['/error'], { queryParams: { errorMsg: err?.error?.message } });
            break;
          default:
            this.router.navigate(['/error'], { queryParams: { errorMsg: 'Page Not found' } });
        }
      }
      return new Observable<HttpEvent<any>>();
    }))
  }
}

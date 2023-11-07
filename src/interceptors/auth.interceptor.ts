import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token = localStorage.getItem('token')!;
  private excludedRoutes = [`${environment.baseUrl}/${environment.signIn}`, `${environment.baseUrl}/${environment.signUp}`];
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token && !this.excludedRoutes.some(route => req.url.includes(route))) {
      const headers = req.headers.set('Authorization', this.token).set('Content-Type', 'application/json');
      const authReq = req.clone({ headers });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class DataInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.tokenService.isLogged()){
      return next.handle(request);
    }
    let intReq = request;
    const token = this.tokenService.getToken();

    intReq = this.addToken(request, token);

    return next.handle(intReq);
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set('auth-token', token) });
  }
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: DataInterceptor, multi: true }];

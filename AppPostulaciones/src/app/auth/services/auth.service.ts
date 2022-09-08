import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser, ResponseResuls, User, TokenResponse } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_SERVER = "http://localhost:3800/api/user/";

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: User): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(this.API_SERVER + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUser): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(this.API_SERVER + 'login', loginUsuario);
  }
}

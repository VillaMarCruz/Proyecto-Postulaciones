import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FechAllAspiranteResponseDetail, Aspirante, FechAllAspiranteResponse } from '../interfaces/aspirantes';

@Injectable({
  providedIn: 'root'
})
export class AspirantesService {
  private API_SERVER = "http://localhost:3800/api/aspirantes";
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<FechAllAspiranteResponse>{
    return this.httpClient.get<FechAllAspiranteResponse>(this.API_SERVER + '/all');
  }

  public detail(id: string): Observable<FechAllAspiranteResponseDetail>{
    return this.httpClient.get<FechAllAspiranteResponseDetail>(this.API_SERVER+`/detail/${id}`)
  }

  public searchUserId(UserId: any): Observable<FechAllAspiranteResponse>{
    let params = new HttpParams().set('UserId', UserId);
    return this.httpClient.get<FechAllAspiranteResponse>(this.API_SERVER + '/search', { params: params });
  }

  public searchId(id: any): Observable<FechAllAspiranteResponse>{
    let params = new HttpParams().set('_id', id);
    return this.httpClient.get<FechAllAspiranteResponse>(this.API_SERVER + '/search', { params: params });
  }

  public search(param: any, value: any): Observable<FechAllAspiranteResponse>{
    let params = new HttpParams().set(param, value);
    return this.httpClient.get<FechAllAspiranteResponse>(this.API_SERVER + '/search', { params: params });
  }


  public save(aspirante: Aspirante): Observable<FechAllAspiranteResponseDetail>{
    return this.httpClient.post<FechAllAspiranteResponseDetail>(this.API_SERVER + '/create', aspirante);
  }

  public update(id: string, aspirante: Aspirante): Observable<FechAllAspiranteResponseDetail>{
    return this.httpClient.put<FechAllAspiranteResponseDetail>(this.API_SERVER+`/update/${id}`, aspirante);
  }

  public delete(id: string): Observable<FechAllAspiranteResponseDetail>{
    return this.httpClient.delete<FechAllAspiranteResponseDetail>(this.API_SERVER + `/delete/${id}`);
  }

  public savePostulaciones(postulacion: any): Observable<any>{
    return this.httpClient.post<any>(this.API_SERVER + '/register-postulacion', postulacion);
  }
}

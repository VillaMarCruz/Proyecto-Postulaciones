import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FechAllCargosResponse, FechAllCargosResponseDetail, Cargos, FechAllAspiranteResponse } from '../interfaces/aspirantes';

@Injectable({
  providedIn: 'root'
})
export class CargosService {
  private API_SERVER = "http://localhost:3800/api/cargos";
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<FechAllCargosResponse>{
    return this.httpClient.get<FechAllCargosResponse>(this.API_SERVER + '/all');
  }

  public detailCargoAspirante(id: string): Observable<FechAllAspiranteResponse>{
    return this.httpClient.get<FechAllAspiranteResponse>(this.API_SERVER+`/${id}`)
  }

  public search(id: string): Observable<FechAllCargosResponse>{
    let params = new HttpParams().set('_id', id);
    return this.httpClient.get<FechAllCargosResponse>(this.API_SERVER + '/search', { params: params });
  }

  public save(cargo: any): Observable<FechAllCargosResponseDetail>{
    return this.httpClient.post<FechAllCargosResponseDetail>(this.API_SERVER + '/create', cargo);
  }

  public update(id: string, cargo: any): Observable<FechAllCargosResponseDetail>{
    return this.httpClient.put<FechAllCargosResponseDetail>(this.API_SERVER+`/update/${id}`, cargo);
  }

  public delete(id: string): Observable<FechAllCargosResponseDetail>{
    return this.httpClient.delete<FechAllCargosResponseDetail>(this.API_SERVER + `/delete/${id}`);
  }

}

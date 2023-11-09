import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConnectorService } from './http-connector-service';
import { TapeteDto } from '../model/tapete-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TapeteHttpConnectorService implements HttpConnectorService<TapeteDto> {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }
  listar(): Promise<TapeteDto[]> {
    return this.http
      .get<TapeteDto[]>('http://localhost:3000/tapetes')
      .toPromise();
  }
  salvar(tipo: TapeteDto): Promise<TapeteDto> {
    const tipoJson: string = JSON.stringify(tipo);
    return this.http.post<TapeteDto>('http://localhost:3000/tapetes', tipoJson, this.httpOptions).toPromise();
  }
  obter(id: number): Promise<TapeteDto> {
    return this.http.get<TapeteDto>(`http://localhost:3000/tapetes/${id}`).toPromise();
  }

  remover(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/tapetes/${id}`);
  }
}

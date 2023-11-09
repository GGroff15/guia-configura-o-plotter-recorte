import { Observable } from 'rxjs';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConnectorService } from './http-connector-service';

@Injectable({
  providedIn: 'root'
})
export class CanetaHttpConectorService implements HttpConnectorService<CanetaDto> {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  listar(): Promise<CanetaDto[]> {
    return this.http.get<CanetaDto[]>('http://localhost:3000/canetas').toPromise();
  }

  salvar(caneta: CanetaDto): Promise<CanetaDto> {
    const canetaJson = JSON.stringify(caneta);
    return this.http.post<CanetaDto>('http://localhost:3000/canetas', canetaJson, this.httpOptions).toPromise();
  }

  obter(id: number): Promise<CanetaDto> {
    return this.http.get<CanetaDto>(`http://localhost:3000/canetas/${id}`).toPromise();
  }

  remover(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/canetas/${id}`);
  }
}

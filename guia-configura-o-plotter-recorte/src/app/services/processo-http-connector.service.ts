import { Injectable } from '@angular/core';
import { HttpConnectorService } from './http-connector-service';
import { ProcessoDto } from '../model/processo-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcessoHttpConnectorService
{
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  listar(): Observable<ProcessoDto[]> {
    return this.http
      .get<ProcessoDto[]>('http://localhost:3000/processos')
      .pipe();
  }

  listarComfiltro(filter: string): Observable<ProcessoDto[]> {
    return this.http
      .get<ProcessoDto[]>(`http://localhost:3000/processos?tipo=${filter}`)
      .pipe();
  }

  salvar(tipo: ProcessoDto): Promise<ProcessoDto> {
    const tipoJson: string = JSON.stringify(tipo);
    return this.http
      .post<ProcessoDto>(
        'http://localhost:3000/processos',
        tipoJson,
        this.httpOptions
      )
      .toPromise();
  }

  atualizar(processo: ProcessoDto): Promise<ProcessoDto> {
    const tipoJson: string = JSON.stringify(processo);
    return this.http
      .put<ProcessoDto>(
        `http://localhost:3000/processos/${processo.id}`,
        tipoJson,
        this.httpOptions
      )
      .toPromise();
  }

  obter(id: number): Promise<ProcessoDto> {
    return this.http
      .get<ProcessoDto>(`http://localhost:3000/processos/${id}`)
      .toPromise();
  }

  remover(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/processos/${id}`);
  }
}

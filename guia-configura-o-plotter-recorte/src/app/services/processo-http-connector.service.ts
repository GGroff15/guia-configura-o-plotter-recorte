import { Injectable } from '@angular/core';
import { HttpConnectorService } from './http-connector-service';
import { ProcessoDto } from '../model/processo-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProcessoHttpConnectorService
  implements HttpConnectorService<ProcessoDto>
{
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  listar(): Promise<ProcessoDto[]> {
    return this.http
      .get<ProcessoDto[]>('http://localhost:3000/processos')
      .toPromise();
  }

  listarComfiltro(filter: string): Promise<ProcessoDto[]> {
    return this.http
      .get<ProcessoDto[]>(`http://localhost:3000/processos?tipo=${filter}`)
      .toPromise();
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

  obter(id: number): Promise<ProcessoDto> {
    return this.http
      .get<ProcessoDto>(`http://localhost:3000/processos/${id}`)
      .toPromise();
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LaminaDto } from '../model/lamina-dto';
import { HttpConnectorService } from './http-connector-service';

@Injectable({
  providedIn: 'root'
})
export class LaminaHttpConnectorService implements HttpConnectorService<LaminaDto> {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  listar(): Promise<LaminaDto[]> {
    return this.http.get<LaminaDto[]>('http://localhost:3000/laminas').toPromise();
  }

  salvar(lamina: LaminaDto): Promise<LaminaDto> {
    const laminaJson: string = JSON.stringify(lamina);
    return this.http.post<LaminaDto>('http://localhost:3000/laminas', laminaJson, this.httpOptions).toPromise();
  }

  obter(id: number): Promise<LaminaDto> {
    return this.http.get<LaminaDto>(`http://localhost:3000/laminas/${id}`).toPromise();
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConnectorService } from './http-connector-service';
import { MaterialDto } from '../model/material-dto';

@Injectable({
  providedIn: 'root'
})
export class MaterialHttpConnectorService implements HttpConnectorService<MaterialDto> {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) { }
  listar(): Promise<MaterialDto[]> {
    return this.http
      .get<MaterialDto[]>('http://localhost:3000/materiais')
      .toPromise();
  }
  salvar(tipo: MaterialDto): Promise<MaterialDto> {
    const tipoJson: string = JSON.stringify(tipo);
    return this.http.post<MaterialDto>('http://localhost:3000/materiais', tipoJson, this.httpOptions).toPromise();
  }
  obter(id: number): Promise<MaterialDto> {
    return this.http.get<MaterialDto>(`http://localhost:3000/materiais/${id}`).toPromise();
  }
}

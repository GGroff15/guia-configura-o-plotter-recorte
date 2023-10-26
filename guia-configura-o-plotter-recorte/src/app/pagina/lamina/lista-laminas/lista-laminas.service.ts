import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LaminaDto } from 'src/app/model/lamina-dto';
import { LaminaService } from 'src/app/services/lamina.service';

@Injectable({
  providedIn: 'root'
})
export class ListaLaminasService {
  
  private laminas;

  constructor(private service: LaminaService) {
    this.laminas = new BehaviorSubject<LaminaDto[]>(this.service.listar())
  }
  
  getListaLaminas(): Observable<LaminaDto[]> {
    return this.laminas.asObservable();
  }
}

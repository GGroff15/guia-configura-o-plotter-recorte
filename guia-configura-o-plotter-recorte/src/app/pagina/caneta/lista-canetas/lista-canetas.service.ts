import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { CanetaService } from 'src/app/services/caneta.service';

@Injectable({
  providedIn: 'root'
})
export class ListaCanetasService {
  
  private canetas;

  constructor(private service: CanetaService) {
    this.canetas = new BehaviorSubject<CanetaDto[]>(this.service.listar());
  }
  
  getListaCanetas(): Observable<CanetaDto[]> {
    return this.canetas.asObservable();
  }
}

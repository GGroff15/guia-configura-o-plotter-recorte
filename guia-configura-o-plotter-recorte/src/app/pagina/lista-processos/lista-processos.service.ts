import { ProcessoDto } from 'src/app/model/processo-dto';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProcessoService } from 'src/app/services/processo.service';

@Injectable({
  providedIn: 'root'
})
export class ListaProcessosService {
  
  private processos;

  constructor(private service : ProcessoService){
    this.processos = new BehaviorSubject<ProcessoDto[]>(this.service.listar('Todos'));
  }

  setFiltro(filtro: string) {
    this.processos.next(this.service.listar(filtro));
  }

  getListaProcessos(): Observable<ProcessoDto[]> {
    return this.processos.asObservable();
  }
}

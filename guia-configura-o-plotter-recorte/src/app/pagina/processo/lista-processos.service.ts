import { ProcessoDto } from 'src/app/model/processo-dto';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProcessoService } from 'src/app/services/processo.service';
import { Constants } from 'src/app/utils/constantes';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';

@Injectable({
  providedIn: 'root'
})
export class ListaProcessosService {
    
  private processosSource = new Subject<ProcessoDto[]>();
  private selectedFilter: string;

  constructor(private service : ProcessoService){
    this.atualizarListaProcessos();
  }

  listar(): Observable<ProcessoDto[]> {
    this.atualizarListaProcessos();

    if(this.selectedFilter === 'Todos') {
      return this.service.listar();
    }
    return this.service.listarComfiltro(this.selectedFilter);
  }
  
  salvar(caneta: ProcessoDto): void {
    this.service.salvar(caneta);
    this.atualizarListaProcessos();
  }

  remover(id: number): void {
    this.service.remover(id);
    this.atualizarListaProcessos();
  }

  private atualizarListaProcessos() {
    if (this.selectedFilter === 'Todos') {
      this.service.listar().subscribe((processso) => {
        this.processosSource.next(processso);
        WebStorageUtil.set(Constants.PROCESSO_KEY, processso);
      }, (error) => {
        this.processosSource.next(WebStorageUtil.get(Constants.PROCESSO_KEY));
      });
    } else {
      this.service.listarComfiltro(this.selectedFilter).subscribe((processso) => {
        this.processosSource.next(processso);
        WebStorageUtil.set(Constants.PROCESSO_KEY, processso);
      }, (error) => {
        this.processosSource.next(WebStorageUtil.get(Constants.PROCESSO_KEY));
      });
    }
  }

  asObservable(): Observable<ProcessoDto[]> {
    return this.processosSource.asObservable();
  }

  setFiltro(selectedFilter: string) {
    this.selectedFilter = selectedFilter;
    this.listar();
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListaProcessosService } from '../lista-processos.service';

@Component({
  selector: 'app-filtro-tipo-processo',
  templateUrl: './filtro-tipo-processo.component.html',
  styleUrls: ['./filtro-tipo-processo.component.css']
})
export class FiltroTipoProcessoComponent {

  selectedFilter: string;

  constructor(private service: ListaProcessosService) {
    this.selectedFilter = 'Todos';
  }

  filterChange(opcao: string) {
    this.selectedFilter = opcao;
    this.service.setFiltro(this.selectedFilter);
  }

}

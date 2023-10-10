import { Component } from '@angular/core';

@Component({
  selector: 'app-filtro-tipo-processo',
  templateUrl: './filtro-tipo-processo.component.html',
  styleUrls: ['./filtro-tipo-processo.component.css']
})
export class FiltroTipoProcessoComponent {

  selectedFilter: string;

  constructor() {
    this.selectedFilter = 'Todos';
  }

  filterChange(opcao: string) {
    console.log(opcao);
    this.selectedFilter = opcao;
  }

}

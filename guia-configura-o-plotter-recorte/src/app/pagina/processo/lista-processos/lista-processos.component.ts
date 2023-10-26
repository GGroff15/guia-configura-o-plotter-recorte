import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-processos',
  templateUrl: './lista-processos.component.html',
  styleUrls: ['./lista-processos.component.css'],
})
export class ListaProcessosComponent {
  selectedFilter: string;

  constructor() {
    this.selectedFilter = '';
  }

  onChangeFilter(selectedFilter: string) {
    this.selectedFilter = selectedFilter;
  }
}

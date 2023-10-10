import { ListaProcessosService } from './../lista-processos.service';
import { Component } from '@angular/core';
import { ProcessoDto } from 'src/app/model/processo-dto';

@Component({
  selector: 'app-item-processo',
  templateUrl: './item-processo.component.html',
  styleUrls: ['./item-processo.component.css']
})
export class ItemProcessoComponent {

  filtro: string = 'Todos';
  processos!: ProcessoDto[];

  constructor(private listaProcessosService: ListaProcessosService) {
  }

  ngOnInit(): void {
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);

    this.listaProcessosService.getListaProcessos().subscribe((processos) => {
      this.processos = processos;
    });
  }

}

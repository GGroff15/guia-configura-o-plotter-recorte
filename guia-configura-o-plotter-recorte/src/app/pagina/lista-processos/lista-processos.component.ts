import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcessoDto } from 'src/app/model/processo-dto';
import { ProcessoService } from 'src/app/services/processo.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-lista-processos',
  templateUrl: './lista-processos.component.html',
  styleUrls: ['./lista-processos.component.css']
})
export class ListaProcessosComponent implements OnInit {

  processos: ProcessoDto[];

  constructor(private service : ProcessoService) {
    this.processos = service.listar('Todos');
    console.log(this.processos);
  }
  ngOnInit(): void {
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);
  }

}

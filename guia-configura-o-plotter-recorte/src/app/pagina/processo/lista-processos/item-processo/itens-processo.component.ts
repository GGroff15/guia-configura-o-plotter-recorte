import { ListaProcessosService } from '../../lista-processos.service';
import { Component, OnInit } from '@angular/core';
import { ProcessoDto } from 'src/app/model/processo-dto';
import { Router } from '@angular/router';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';
import { Constants } from 'src/app/utils/constantes';

@Component({
  selector: 'app-itens-processo',
  templateUrl: './itens-processo.component.html',
  styleUrls: ['./itens-processo.component.css'],
})
export class ItensProcessoComponent implements OnInit {
  filtro: string = 'Todos';
  processos!: ProcessoDto[];

  constructor(
    private listaProcessosService: ListaProcessosService,
    private router: Router
  ) {
    this.listarProcessos();
  }

  listarProcessos() {
    this.listaProcessosService.setFiltro('Todos');
    this.listaProcessosService.listar().subscribe((processos) => {
      this.processos = processos;
    }, (erro) => {
      this.processos = WebStorageUtil.get(Constants.PROCESSO_KEY);
    });
  }

  ngOnInit(): void {
    this.listaProcessosService.asObservable().subscribe((processos) => {
      this.processos = processos;
      const collapsible = document.querySelector('.collapsible');
      M.Collapsible.init(collapsible!);
    });
  }

  navegarParaEdicao(id: number) {
    this.router.navigate(['/editar-processo', id]);
  }

  remover(id: number) {
    this.listaProcessosService.remover(id);
  }
}

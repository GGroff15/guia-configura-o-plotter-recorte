import { ListaProcessosService } from '../lista-processos.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProcessoDto } from 'src/app/model/processo-dto';
import { ModalService } from './modal.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-itens-processo',
  templateUrl: './itens-processo.component.html',
  styleUrls: ['./itens-processo.component.css']
})
export class ItensProcessoComponent implements OnInit, AfterViewInit {

  filtro: string = 'Todos';
  processos!: ProcessoDto[];
  processo!: ProcessoDto;

  constructor(private listaProcessosService: ListaProcessosService,
    private modalService: ModalService,
    private router: Router) {
  }
  ngAfterViewInit(): void {
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);

    const drop = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(drop);
  }

  ngOnInit(): void {
    this.listaProcessosService.getListaProcessos().subscribe((processos) => {
      this.processos = processos;
    });
  }

  openModal() {
    this.modalService.openModal();
  }

  openDropdown(processo: ProcessoDto) {
    this.processo = processo;
  }
  
  navegarParaEdicao() {
    this.router.navigate(['/editar-processo', this.processo.codigo]);
  }

}

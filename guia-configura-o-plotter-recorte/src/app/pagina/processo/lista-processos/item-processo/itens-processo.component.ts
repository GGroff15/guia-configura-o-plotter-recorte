import { ListaProcessosService } from '../lista-processos.service';
import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { ProcessoDto } from 'src/app/model/processo-dto';
import { Router } from '@angular/router';
import { ProcessoService } from 'src/app/services/processo.service';

@Component({
  selector: 'app-itens-processo',
  templateUrl: './itens-processo.component.html',
  styleUrls: ['./itens-processo.component.css'],
})
export class ItensProcessoComponent implements OnInit {
  filtro: string = 'Todos';
  processos!: ProcessoDto[];
  processo!: ProcessoDto;
  private observer: MutationObserver;

  constructor(
    private listaProcessosService: ListaProcessosService,
    private router: Router,
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private processoService: ProcessoService
  ) {
    this.observer = new MutationObserver((mutationsList, observer) => {
      this.ngZone.run(() => {
        mutationsList.forEach((mutation) => {
          mutation.addedNodes.forEach((addedNode) => {
            if (addedNode instanceof HTMLElement) {
              if (addedNode.classList.contains('initialize-dropdown')) {
                const a = addedNode.querySelector('.dropdown-trigger');
                M.Dropdown.init(a!);
              }
            }
          });
        });
      });
    });
  }

  ngOnInit(): void {
    this.listaProcessosService.getListaProcessos().subscribe((processos) => {
      this.processos = processos;
      this.iniciarObservacaoDOM();
      const collapsible = document.querySelector('.collapsible');
      M.Collapsible.init(collapsible!);
    });
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  iniciarObservacaoDOM() {
    const config = { childList: true, subtree: true };
    this.observer.observe(this.elementRef.nativeElement, config);
  }

  openDropdown(processo: ProcessoDto) {
    this.processo = processo;
  }

  navegarParaEdicao() {
    this.router.navigate(['/editar-processo', this.processo.id]);
  }

  remover() {
    this.processoService.remover(this.processo.id);
  }
}

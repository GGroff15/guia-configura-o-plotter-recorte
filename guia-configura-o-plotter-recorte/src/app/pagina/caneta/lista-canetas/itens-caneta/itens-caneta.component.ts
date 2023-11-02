import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { CanetaService } from 'src/app/services/caneta.service';
import { ListaCanetasService } from '../lista-canetas.service';

@Component({
  selector: 'app-itens-caneta',
  templateUrl: './itens-caneta.component.html',
  styleUrls: ['./itens-caneta.component.css']
})
export class ItensCanetaComponent implements OnInit {

  canetas: CanetaDto[];
  caneta!: CanetaDto;
  private observer: MutationObserver;

  constructor(private service: CanetaService,
    private listaCanetasService: ListaCanetasService,
    private router: Router,
    private elementRef: ElementRef,
    private ngZone: NgZone) {
    this.canetas = service.listar();
    this.observer = new MutationObserver((mutationsList, observer) => {
      this.ngZone.run(() => {
        mutationsList.forEach((mutation) => {
          mutation.addedNodes.forEach((addedNode) => {
            if (addedNode instanceof HTMLElement) {
              console.log(addedNode);
              if (addedNode.classList.contains('initialize-dropdown')) {
                console.log(addedNode);
                const a = addedNode.querySelector('.dropdown-trigger');
                console.log(a);
                M.Dropdown.init(a!);
              }
            }
          });
        });
      });
    });
  }

  ngOnInit(): void {
    this.listaCanetasService.getListaCanetas().subscribe((canetas) => {
      this.canetas = canetas;
      this.iniciarObservacaoDOM();
    });
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  iniciarObservacaoDOM() {
    const config = { childList: true, subtree: true };
    this.observer.observe(this.elementRef.nativeElement, config);
  }

  openDropdown(caneta: CanetaDto) {
    this.caneta = caneta;
  }

  navegarParaEdicao() {
    this.router.navigate(['/editar-caneta', this.caneta.id]);
  }

  remover() {
    this.service.remover(this.caneta.id);
  }

}

import { Component, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LaminaDto } from 'src/app/model/lamina-dto';
import { LaminaService } from 'src/app/services/lamina.service';
import { ListaLaminasService } from '../lista-laminas.service';

@Component({
  selector: 'app-itens-lamina',
  templateUrl: './itens-lamina.component.html',
  styleUrls: ['./itens-lamina.component.css']
})
export class ItensLaminaComponent {

  laminas: LaminaDto[];
  lamina!: LaminaDto;
  private observer: MutationObserver;

  constructor(private service: LaminaService,
    private listaLaminasService: ListaLaminasService,
    private router: Router,
    private elementRef: ElementRef,
    private ngZone: NgZone) {
    this.laminas = service.listar();
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
    this.listaLaminasService.getListaLaminas().subscribe((laminas) => {
      this.laminas = laminas;
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

  openDropdown(lamina: LaminaDto) {
    this.lamina = lamina;
  }

  navegarParaEdicao() {
    this.router.navigate(['/editar-lamina', this.lamina.id]);
  }

  remover() {
    this.service.remover(this.lamina.id);
  }
}

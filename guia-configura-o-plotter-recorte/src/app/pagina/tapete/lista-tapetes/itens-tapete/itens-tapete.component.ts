import { Component, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TapeteDto } from 'src/app/model/tapete-dto';
import { LaminaService } from 'src/app/services/lamina.service';
import { ListaTapetesService } from '../lista-tapetes.service';
import { TapetesService } from 'src/app/services/tapete.service';

@Component({
  selector: 'app-itens-tapete',
  templateUrl: './itens-tapete.component.html',
  styleUrls: ['./itens-tapete.component.css']
})
export class ItensTapeteComponent {

  tapetes: TapeteDto[];
  tapete!: TapeteDto;

  private observer: MutationObserver;

  constructor(private service: TapetesService,
    private listaTapetesService: ListaTapetesService,
    private router: Router,
    private elementRef: ElementRef,
    private ngZone: NgZone) {
    this.tapetes = service.listar();
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
    this.listaTapetesService.getListaTapetes().subscribe((tapetes) => {
      this.tapetes = tapetes;
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

  openDropdown(tapete: TapeteDto) {
    this.tapete = tapete;
  }

  navegarParaEdicao() {
    this.router.navigate(['/editar-tapete', this.tapete.id]);
  }

  remover() {
    this.service.remover(this.tapete.id);
  }

}

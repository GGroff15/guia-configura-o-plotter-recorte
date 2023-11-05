import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { ListaCanetasService } from '../../lista-canetas.service';
import { Subscription } from 'rxjs';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';
import { Constants } from 'src/app/utils/constantes';

@Component({
  selector: 'app-itens-caneta',
  templateUrl: './itens-caneta.component.html',
  styleUrls: ['./itens-caneta.component.css']
})
export class ItensCanetaComponent implements OnInit {

  canetas: CanetaDto[];
  caneta!: CanetaDto;
  private observer: MutationObserver;
  subscription!: Subscription;

  constructor(private listaCanetasService: ListaCanetasService,
    private router: Router,
    private elementRef: ElementRef,
    private ngZone: NgZone) {
    this.listarCanetas();
    
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

  private listarCanetas() {
    this.listaCanetasService.listar().then((canetas) => {
      this.canetas = canetas;
    }).catch((error) => {
      this.canetas = WebStorageUtil.get(Constants.CANETA_KEY);
    });
  }

  ngOnInit(): void {
    this.subscription = this.listaCanetasService.asObservable().subscribe((canetas) => {
      this.canetas = canetas;
      this.iniciarObservacaoDOM();
    });
  }

  ngOnDestroy() {
    this.observer.disconnect();
    this.subscription.unsubscribe();
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
    this.listaCanetasService.remover(this.caneta.id);
  }

}

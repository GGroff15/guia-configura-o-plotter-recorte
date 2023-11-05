import { Component, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TapeteDto } from 'src/app/model/tapete-dto';
import { LaminaService } from 'src/app/services/lamina.service';
import { ListaTapetesService } from '../../lista-tapetes.service';
import { TapetesService } from 'src/app/services/tapete.service';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';
import { Constants } from 'src/app/utils/constantes';

@Component({
  selector: 'app-itens-tapete',
  templateUrl: './itens-tapete.component.html',
  styleUrls: ['./itens-tapete.component.css']
})
export class ItensTapeteComponent {

  tapetes: TapeteDto[];
  tapete!: TapeteDto;

  private observer: MutationObserver;

  constructor(
    private listaTapetesService: ListaTapetesService,
    private router: Router,
    private elementRef: ElementRef,
    private ngZone: NgZone) {
    this.listarTapetes();
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

  private listarTapetes() {
    this.listaTapetesService.listar().then((tapetes) => {
      this.tapetes = tapetes;
    }).catch((erro) => {
      this.tapetes = WebStorageUtil.get(Constants.TAPETE_KEY);
    })
  }

  ngOnInit(): void {
    this.listaTapetesService.asObservable().subscribe((tapetes) => {
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
    this.listaTapetesService.remover(this.tapete.id);
  }

}

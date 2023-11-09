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

  constructor(private listaCanetasService: ListaCanetasService,
    private router: Router) {
    this.listarCanetas();
  }

  private listarCanetas() {
    this.listaCanetasService.listar().then((canetas) => {
      this.canetas = canetas;
    }).catch((error) => {
      this.canetas = WebStorageUtil.get(Constants.CANETA_KEY);
    });
  }

  ngOnInit(): void {
    this.listaCanetasService.asObservable().subscribe((canetas) => {
      this.canetas = canetas;
    });
  }

  navegarParaEdicao(id: number) {
    this.router.navigate(['/editar-caneta', id]);
  }

  remover(id: number) {
    this.listaCanetasService.remover(id);
  }

}

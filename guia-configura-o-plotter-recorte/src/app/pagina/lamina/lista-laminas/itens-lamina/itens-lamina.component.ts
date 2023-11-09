import { Component, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LaminaDto } from 'src/app/model/lamina-dto';
import { LaminaService } from 'src/app/services/lamina.service';
import { ListaLaminasService } from '../../lista-laminas.service';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';
import { Constants } from 'src/app/utils/constantes';

@Component({
  selector: 'app-itens-lamina',
  templateUrl: './itens-lamina.component.html',
  styleUrls: ['./itens-lamina.component.css']
})
export class ItensLaminaComponent {

  laminas: LaminaDto[];

  constructor(private listaLaminasService: ListaLaminasService,
    private router: Router) {
    this.listarLaminas();
  }

  private listarLaminas() {
    this.listaLaminasService.listar().then((laminas) => {
      this.laminas = laminas;
    }).catch((erro) => {
      this.laminas = WebStorageUtil.get(Constants.LAMINA_KEY);
    });
  }

  ngOnInit(): void {
    this.listaLaminasService.asObservable().subscribe((laminas) => {
      this.laminas = laminas;
    });
  }

  navegarParaEdicao(id: number) {
    this.router.navigate(['/editar-lamina', id]);
  }

  remover(id: number) {
    this.listaLaminasService.remover(id);
  }
}

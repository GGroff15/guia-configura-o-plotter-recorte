import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TapeteDto } from 'src/app/model/tapete-dto';
import { ListaTapetesService } from '../../lista-tapetes.service';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';
import { Constants } from 'src/app/utils/constantes';

@Component({
  selector: 'app-itens-tapete',
  templateUrl: './itens-tapete.component.html',
  styleUrls: ['./itens-tapete.component.css']
})
export class ItensTapeteComponent {

  tapetes: TapeteDto[];

  constructor(
    private listaTapetesService: ListaTapetesService,
    private router: Router) {
    this.listarTapetes();
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
    });
  }

  navegarParaEdicao(id: number) {
    this.router.navigate(['/editar-tapete', id]);
  }

  remover(id: number) {
    this.listaTapetesService.remover(id);
  }

}

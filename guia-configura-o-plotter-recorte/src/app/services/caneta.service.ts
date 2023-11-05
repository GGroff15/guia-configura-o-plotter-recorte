import { CanetaDto } from 'src/app/model/caneta-dto';
import { Injectable } from '@angular/core';
import { WebStorageUtil } from '../utils/webStorageUtils';
import { Constants } from '../utils/constantes';
import { CanetaHttpConectorService } from './caneta-http-conector.service';

const canetaDefault: CanetaDto = {
  id: 0,
  espessura: 0,
};

@Injectable({
  providedIn: 'root',
})
export class CanetaService {
  private canetas: CanetaDto[];

  constructor(private httpConnector: CanetaHttpConectorService) {
    this.httpConnector.listar().then((canetas) => {
      this.canetas = canetas;
      WebStorageUtil.set(Constants.CANETA_KEY, canetas);
    }).catch((error) => {
      this.canetas = WebStorageUtil.get(Constants.CANETA_KEY);
    });
  }

  listar(): Promise<CanetaDto[]> {
    return this.httpConnector.listar();
  }

  obter(id: number): Promise<CanetaDto> {
    return this.httpConnector.obter(id);
  }

  remover(id: number) {
    for (let index = 0; index < this.canetas.length; index++) {
      const element = this.canetas[index];
      if (element.id == id) {
        this.canetas.splice(index, 1);
      }
    }
    WebStorageUtil.set(Constants.CANETA_KEY, this.canetas);
  }

  salvar(caneta: CanetaDto) {
    let maiorCodigo = 0;
    for (let index = 0; index < this.canetas.length; index++) {
      const element = this.canetas[index];
      if (element.id > maiorCodigo) {
        maiorCodigo = element.id;
      }
    }

    caneta.id = maiorCodigo + 1;
    this.canetas.push(caneta);

    WebStorageUtil.set(Constants.CANETA_KEY, this.canetas);
    this.httpConnector.salvar(caneta);
  }
}

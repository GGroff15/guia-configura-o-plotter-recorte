import { Injectable } from '@angular/core';
import { TapeteDto } from '../model/tapete-dto';
import { LaminaDto } from '../model/lamina-dto';
import { WebStorageUtil } from '../utils/webStorageUtils';
import { Constants } from '../utils/constantes';
import { TapeteHttpConnectorService } from './tapete-http-connector.service';

const tapeteDefault: TapeteDto = {
  id: 0,
  cor: '',
  forcaAderencia: '',
};

@Injectable({
  providedIn: 'root'
})
export class TapetesService {
  
  private tapetes: TapeteDto[];

  constructor(private httpConnector: TapeteHttpConnectorService) {
    this.httpConnector.listar().then((tapetes) => {
      this.tapetes = tapetes;
      WebStorageUtil.set(Constants.TAPETE_KEY, tapetes);
    }).catch((error) => {
      this.tapetes = WebStorageUtil.get(Constants.TAPETE_KEY);
    });
  }

  listar(): Promise<TapeteDto[]> {
    return this.httpConnector.listar();
  }

  obter(id: number): Promise<TapeteDto> {
    return this.httpConnector.obter(id);
  }

  remover(id: number) {
    for (let index = 0; index < this.tapetes.length; index++) {
      const element = this.tapetes[index];
      if (element.id == id) {
        this.tapetes.splice(index, 1);
      }
    }
    this.httpConnector.remover(id).subscribe((response) => {
      WebStorageUtil.set(Constants.TAPETE_KEY, this.tapetes);
    });
  }

  salvar(tapete: TapeteDto) {
    let maiorCodigo = 0;
    for (let index = 0; index < this.tapetes?.length; index++) {
      const element = this.tapetes[index];
      if (element.id > maiorCodigo) {
        maiorCodigo = element.id;
      }
    }

    tapete.id = maiorCodigo+1;
    this.tapetes.push(tapete);

    WebStorageUtil.set(Constants.TAPETE_KEY, this.tapetes);
    this.httpConnector.salvar(tapete);
  }

  atualizar(tapete: TapeteDto): Promise<TapeteDto> {
    for (let index = 0; index < this.tapetes.length; index++) {
      const element = this.tapetes[index];
      if (element.id == tapete.id) {
        this.tapetes[index] = tapete;
      }
    }
    WebStorageUtil.set(Constants.CANETA_KEY, this.tapetes);
    return this.httpConnector.atualizar(tapete);
  }
}

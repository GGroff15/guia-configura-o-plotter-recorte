import { Injectable } from '@angular/core';
import { TapeteDto } from '../model/tapete-dto';
import { LaminaDto } from '../model/lamina-dto';
import { WebStorageUtil } from '../utils/webStorageUtils';
import { Constants } from '../utils/constantes';

const tapeteDefault: TapeteDto = {
  codigo: 0,
  cor: '',
  forcaAderencia: '',
};

@Injectable({
  providedIn: 'root'
})
export class TapetesService {
  
  private tapetes: TapeteDto[];

  constructor() {
    this.tapetes = WebStorageUtil.get(Constants.TAPETE_KEY);
  }

  listar(): TapeteDto[] {
    return this.tapetes;
  }

  obter(id: number) {
    for (let index = 0; index < this.tapetes.length; index++) {
      const element = this.tapetes[index];
      if (element.codigo == id) {
        return element
      }
    }
    return tapeteDefault;
  }

  remover(id: number) {
    for (let index = 0; index < this.tapetes.length; index++) {
      const element = this.tapetes[index];
      if (element.codigo == id) {
        this.tapetes.splice(index, 1);
      }
    }
    WebStorageUtil.set(Constants.TAPETE_KEY, this.tapetes);
  }

  salvar(tapete: TapeteDto) {
    let maiorCodigo = 0;
    for (let index = 0; index < this.tapetes?.length; index++) {
      const element = this.tapetes[index];
      if (element.codigo > maiorCodigo) {
        maiorCodigo = element.codigo;
      }
    }

    tapete.codigo = maiorCodigo+1;
    this.tapetes.push(tapete);
    WebStorageUtil.set(Constants.TAPETE_KEY, this.tapetes);
  }
}

import { Injectable } from '@angular/core';
import { LaminaDto } from '../model/lamina-dto';
import { WebStorageUtil } from '../utils/webStorageUtils';
import { Constants } from '../utils/constantes';

const laminaDefault: LaminaDto = {
  id: 0,
  cor: '',
  tipoCorte: '',
};

@Injectable({
  providedIn: 'root'
})
export class LaminaService {
  
  private laminas: LaminaDto[];

  constructor() {
    this.laminas = WebStorageUtil.get(Constants.LAMINA_KEY);
  }

  listar(): LaminaDto[] {
    return this.laminas;
  }

  obter(id: number): LaminaDto {
    for (let index = 0; index < this.laminas.length; index++) {
      const element = this.laminas[index];
      if (element.id == id) {
        return element;
      }
    }
    return laminaDefault;
  }

  remover(id: number) {
    for (let index = 0; index < this.laminas.length; index++) {
      const element = this.laminas[index];
      if (element.id == id) {
        this.laminas.splice(index, 1);
      } 
    }

    WebStorageUtil.set(Constants.LAMINA_KEY, this.laminas);
  }

  salvar(lamina: LaminaDto) {
    
    let maiorCodigo = 0;
    for (let index = 0; index < this.laminas.length; index++) {
      const element = this.laminas[index];
      if (element.id > maiorCodigo) {
        maiorCodigo = element.id;
      }
    }

    lamina.id = maiorCodigo+1;
    this.laminas.push(lamina);

    WebStorageUtil.set(Constants.LAMINA_KEY, this.laminas);
  }
}

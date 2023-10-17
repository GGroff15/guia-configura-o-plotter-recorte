import { Injectable } from '@angular/core';
import { TapeteDto } from '../model/tapete-dto';

const tapeteDefault: TapeteDto = {
  codigo: 0,
  cor: '',
  forcaAderencia: '',
};

// Itens de exemplo para TapeteDto
const tapete1: TapeteDto = {
  codigo: 1,
  cor: 'Azul',
  forcaAderencia: 'Alta',
};

const tapete2: TapeteDto = {
  codigo: 2,
  cor: 'Verde',
  forcaAderencia: 'Média',
};

@Injectable({
  providedIn: 'root'
})
export class TapetesService {

  private tapetes: TapeteDto[];

  constructor() {
    this.tapetes = [tapete1, tapete2];
  }

  listar(): TapeteDto[] {
    return this.tapetes;
  }

  obter(id: number) {
    for (let index = 0; index < this.tapetes.length; index++) {
      const element = this.tapetes[index];
      if (element.codigo === id) {
        return element
      }
    }
    return tapeteDefault;
  }
}

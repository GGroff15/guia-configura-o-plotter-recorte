import { Injectable } from '@angular/core';
import { TapeteDto } from '../model/tapete-dto';

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
}

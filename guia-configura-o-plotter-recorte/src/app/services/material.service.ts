import { Injectable } from '@angular/core';
import { MaterialDto } from '../model/material-dto';

const materialDefault: MaterialDto = {
  codigo: 0,
  nome: '',
  gramatura: 0
};

// Itens de exemplo para MaterialDto
const material1: MaterialDto = {
  codigo: 1,
  nome: 'Material A',
  gramatura: 500
};

const material2: MaterialDto = {
  codigo: 2,
  nome: 'Material B',
  gramatura: 220
};

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private materiais: MaterialDto[];

  constructor() {
    this.materiais = [material1, material2];
  }

  listar() : MaterialDto[] {
    return this.materiais;
  }

  obter(id: number): MaterialDto {
    for (let index = 0; index < this.materiais.length; index++) {
      const element = this.materiais[index];
      if (element.codigo === id) {
        return element;
      }
    }
    return materialDefault;
  }
}

import { CanetaDto } from 'src/app/model/caneta-dto';
import { Injectable } from '@angular/core';

const canetaDefault: CanetaDto = {
  codigo: 0,
  espessura: 0
}

// Itens de exemplo para CanetaDto
const caneta1: CanetaDto = {
  codigo: 1,
  espessura: 0.5,
};

const caneta2: CanetaDto = {
  codigo: 2,
  espessura: 0.7,
};

@Injectable({
  providedIn: 'root'
})
export class CanetaService {

  private canetas: CanetaDto[];

  constructor() {
    this.canetas = [caneta1, caneta2];
  }

  listar(): CanetaDto[] {
    return this.canetas;
  }

  obter(id: number): CanetaDto {
    for (let index = 0; index < this.canetas.length; index++) {
      const element = this.canetas[index];
      if (element.codigo === id) {
        return element;
      }
    }
    return canetaDefault;
  }
}

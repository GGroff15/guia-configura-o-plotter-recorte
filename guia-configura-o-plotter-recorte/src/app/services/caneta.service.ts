import { Injectable } from '@angular/core';
import { CanetaDto } from '../model/caneta-dto';

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
}

import { Injectable } from '@angular/core';
import { LaminaDto } from '../model/lamina-dto';

// Itens de exemplo para LaminaDto
const lamina1: LaminaDto = {
  codigo: 1,
  cor: 'Prata',
  tipoCorte: 'Fino',
};

const lamina2: LaminaDto = {
  codigo: 2,
  cor: 'Ouro',
  tipoCorte: 'Grosso',
};

@Injectable({
  providedIn: 'root'
})
export class LaminaService {

  private laminas: LaminaDto[];

  constructor() {
    this.laminas = [lamina1, lamina2];
  }

  listar(): LaminaDto[] {
    return this.laminas;
  }
}

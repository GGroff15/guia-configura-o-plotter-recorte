import { Injectable } from '@angular/core';
import { LaminaDto } from '../model/lamina-dto';

const laminaDefault: LaminaDto = {
  codigo: 0,
  cor: '',
  tipoCorte: '',
};

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

  obter(id: number): LaminaDto {
    for (let index = 0; index < this.laminas.length; index++) {
      const element = this.laminas[index];
      if (element.codigo == id) {
        return element;
      }
    }
    return laminaDefault;
  }

  remover(id: number) {
    for (let index = 0; index < this.laminas.length; index++) {
      const element = this.laminas[index];
      if (element.codigo == id) {
        this.laminas.splice(index, 1);
      }
    }
  }

  salvar(lamina: LaminaDto) {
    let maiorCodigo = 0;
    for (let index = 0; index < this.laminas.length; index++) {
      const element = this.laminas[index];
      if (element.codigo > maiorCodigo) {
        maiorCodigo = element.codigo;
      }
    }

    lamina.codigo = maiorCodigo+1;
    this.laminas.push(lamina);
  }
}

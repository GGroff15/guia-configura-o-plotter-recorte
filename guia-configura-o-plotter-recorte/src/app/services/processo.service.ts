import { ProcessoDto } from '../model/processo-dto';
import { CanetaDto } from '../model/caneta-dto';
import { LaminaDto } from '../model/lamina-dto';
import { MaterialDto } from '../model/material-dto';
import { TapeteDto } from '../model/tapete-dto';
import { Injectable } from '@angular/core';

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

// Itens de exemplo para CanetaDto
const caneta1: CanetaDto = {
  codigo: 1,
  espessura: 0.5,
};

const caneta2: CanetaDto = {
  codigo: 2,
  espessura: 0.7,
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

const processoDefault: ProcessoDto = {
  codigo: 0,
  materialDto: material1,
  tapeteDto: tapete1,
  canetaDto: caneta1,
  pressaoFerramenta: 10,
  tipo: '',
  laminaDto: lamina1,
  profundidadeLamina: 5,
  tecido: false,
};

// Itens de exemplo para ProcessoDto
const processo1: ProcessoDto = {
  codigo: 1001,
  materialDto: material1,
  tapeteDto: tapete1,
  canetaDto: caneta1,
  pressaoFerramenta: 10,
  tipo: 'Corte',
  laminaDto: lamina1,
  profundidadeLamina: 5,
  tecido: true,
};

const processo2: ProcessoDto = {
  codigo: 1002,
  materialDto: material2,
  tapeteDto: tapete2,
  canetaDto: caneta2,
  pressaoFerramenta: 15,
  tipo: 'Desenho',
  laminaDto: lamina2,
  profundidadeLamina: 7,
  tecido: false,
};

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  processos: ProcessoDto[];

  constructor() {
    this.processos = [processo1, processo2];
  }

  listar(filtro: string): ProcessoDto[] {
    if (filtro === 'Todos') {
      return this.processos;
    }
    return this.processos.filter(processo => processo.tipo === filtro);
  }

  salver(processo: ProcessoDto) {

    let maiorCodigo = 0;
    for (let index = 0; index < this.processos.length; index++) {
      const element = this.processos[index];
      if (element.codigo > maiorCodigo) {
        maiorCodigo = element.codigo;
      }
    }

    processo.codigo = maiorCodigo++;
    this.processos.push(processo);
  }

  obter(id: number): ProcessoDto {
    console.log('Id processo: ', id);
    for (let index = 0; index < this.processos.length; index++) {
      const element = this.processos[index];
      if (element.codigo == id) {
        console.log("Processo encontrado: ", element);
        return element
      }
    }
    return processoDefault;
  }
}

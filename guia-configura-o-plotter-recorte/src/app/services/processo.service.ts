import { ProcessoDto } from '../model/processo-dto';
import { CanetaDto } from '../model/caneta-dto';
import { LaminaDto } from '../model/lamina-dto';
import { MaterialDto } from '../model/material-dto';
import { TapeteDto } from '../model/tapete-dto';
import { Injectable } from '@angular/core';
import { WebStorageUtil } from '../utils/webStorageUtils';
import { Constants } from '../utils/constantes';

// Itens de exemplo para MaterialDto
const material1: MaterialDto = {
  id: 1,
  nome: 'Material A',
  gramatura: 500,
};

// Itens de exemplo para TapeteDto
const tapete1: TapeteDto = {
  id: 1,
  cor: 'Azul',
  forcaAderencia: 'Alta',
};

// Itens de exemplo para CanetaDto
const caneta1: CanetaDto = {
  id: 1,
  espessura: 0.5,
};

// Itens de exemplo para LaminaDto
const lamina1: LaminaDto = {
  id: 1,
  cor: 'Prata',
  tipoCorte: 'Fino',
};

const processoDefault: ProcessoDto = {
  id: 0,
  materialDto: material1,
  tapeteDto: tapete1,
  canetaDto: caneta1,
  pressaoFerramenta: 10,
  tipo: '',
  laminaDto: lamina1,
  profundidadeLamina: 5,
  tecido: false,
};

@Injectable({
  providedIn: 'root',
})
export class ProcessoService {
  processos: ProcessoDto[];

  constructor() {
    this.processos = WebStorageUtil.get(Constants.PROCESSO_KEY);
  }

  listar(filtro: string): ProcessoDto[] {
    if (filtro === 'Todos') {
      return this.processos;
    }
    return this.processos.filter((processo) => processo.tipo === filtro);
  }

  obter(id: number): ProcessoDto {
    for (let index = 0; index < this.processos.length; index++) {
      const element = this.processos[index];
      if (element.id == id) {
        return element;
      }
    }
    return processoDefault;
  }

  salver(processo: ProcessoDto) {
    let maiorCodigo = 0;
    for (let index = 0; index < this.processos.length; index++) {
      const element = this.processos[index];
      if (element.id > maiorCodigo) {
        maiorCodigo = element.id;
      }
    }

    processo.id = maiorCodigo + 1;
    this.processos.push(processo);
    WebStorageUtil.set(Constants.PROCESSO_KEY, this.processos);
  }

  remover(id: number) {
    console.log('Id do processo a ser removido: ', id);
    for (let index = 0; index < this.processos.length; index++) {
      const element = this.processos[index];
      if (element.id == id) {
        console.log('Processo a ser removido: ', element);
        this.processos.splice(index, 1);
        console.log('lista restantte: ', this.processos);
      }
    }
    WebStorageUtil.set(Constants.PROCESSO_KEY, this.processos);
  }
}

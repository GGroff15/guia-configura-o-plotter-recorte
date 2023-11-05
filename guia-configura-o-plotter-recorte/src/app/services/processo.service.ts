import { ProcessoDto } from '../model/processo-dto';
import { CanetaDto } from '../model/caneta-dto';
import { LaminaDto } from '../model/lamina-dto';
import { MaterialDto } from '../model/material-dto';
import { TapeteDto } from '../model/tapete-dto';
import { Injectable } from '@angular/core';
import { WebStorageUtil } from '../utils/webStorageUtils';
import { Constants } from '../utils/constantes';
import { ProcessoHttpConnectorService } from './processo-http-connector.service';

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

  constructor(private httpConnector: ProcessoHttpConnectorService) {
    this.httpConnector
      .listar()
      .then((processos) => {
        this.processos = processos;
        WebStorageUtil.set(Constants.PROCESSO_KEY, processos);
      })
      .catch((error) => {
        this.processos = WebStorageUtil.get(Constants.PROCESSO_KEY);
      });
  }

  listar(): Promise<ProcessoDto[]> {
    return this.httpConnector.listar();
  }

  listarComfiltro(filter: string): Promise<ProcessoDto[]> {
    return this.httpConnector.listarComfiltro(filter);
  }

  obter(id: number): Promise<ProcessoDto> {
    return this.httpConnector.obter(id);
  }

  salvar(processo: ProcessoDto): void {
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
    this.httpConnector.salvar(processo);
  }

  remover(id: number) {
    for (let index = 0; index < this.processos.length; index++) {
      const element = this.processos[index];
      if (element.id == id) {
        this.processos.splice(index, 1);
      }
    }
    WebStorageUtil.set(Constants.PROCESSO_KEY, this.processos);
  }
}

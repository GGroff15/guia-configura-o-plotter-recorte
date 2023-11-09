import { Injectable } from '@angular/core';
import { LaminaDto } from '../model/lamina-dto';
import { WebStorageUtil } from '../utils/webStorageUtils';
import { Constants } from '../utils/constantes';
import { LaminaHttpConnectorService } from './lamina-http-connector.service';

const laminaDefault: LaminaDto = {
  id: 0,
  cor: '',
  tipoCorte: '',
};

@Injectable({
  providedIn: 'root'
})
export class LaminaService {
  
  private laminas: LaminaDto[];

  constructor(private httpConnector: LaminaHttpConnectorService) {
    this.httpConnector.listar().then((laminas) => {
      this.laminas = laminas;
      WebStorageUtil.set(Constants.LAMINA_KEY, laminas);
    }).catch((erro) => {
      this.laminas = WebStorageUtil.get(Constants.LAMINA_KEY);
    });
  }

  listar(): Promise<LaminaDto[]> {
    return this.httpConnector.listar();
  }

  obter(id: number): Promise<LaminaDto> {
    return this.httpConnector.obter(id);
  }

  remover(id: number) {
    for (let index = 0; index < this.laminas.length; index++) {
      const element = this.laminas[index];
      if (element.id == id) {
        this.laminas.splice(index, 1);
      } 
    }
    this.httpConnector.remover(id).subscribe((response) => {
      WebStorageUtil.set(Constants.LAMINA_KEY, this.laminas);
    })
  }

  salvar(lamina: LaminaDto) {
    
    let maiorCodigo = 0;
    for (let index = 0; index < this.laminas.length; index++) {
      const element = this.laminas[index];
      if (element.id > maiorCodigo) {
        maiorCodigo = element.id;
      }
    }

    lamina.id = maiorCodigo+1;
    this.laminas.push(lamina);

    WebStorageUtil.set(Constants.LAMINA_KEY, this.laminas);
    this.httpConnector.salvar(lamina);
  }
}

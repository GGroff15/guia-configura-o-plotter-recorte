import { Injectable } from '@angular/core';
import { MaterialDto } from '../model/material-dto';
import { MaterialHttpConnectorService } from './material-http-connector.service';
import { WebStorageUtil } from '../utils/webStorageUtils';
import { Constants } from '../utils/constantes';

const materialDefault: MaterialDto = {
  id: 0,
  nome: '',
  gramatura: 0
};

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private materiais: MaterialDto[];

  constructor(private httpConnector: MaterialHttpConnectorService) {
    this.httpConnector.listar().then((materiais) => {
      this.materiais = materiais;
      WebStorageUtil.set(Constants.MATERIAL_KEY, materiais);
    }).catch((erro) => {
      this.materiais = WebStorageUtil.get(Constants.MATERIAL_KEY);
    });
  }

  listar() : Promise<MaterialDto[]> {
    return this.httpConnector.listar();
  }

  obter(id: number): Promise<MaterialDto> {
    return this.httpConnector.obter(id);
  }
}

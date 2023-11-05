import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { CanetaService } from 'src/app/services/caneta.service';
import { Constants } from 'src/app/utils/constantes';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';

@Injectable({
  providedIn: 'root'
})
export class ListaCanetasService {
  
  private canetasSource = new Subject<CanetaDto[]>();

  constructor(private service: CanetaService) {
    this.service.listar().then((canetas) => {
      WebStorageUtil.set(Constants.CANETA_KEY, canetas);
      this.canetasSource.next(canetas);
    }).catch((error) => {
      this.canetasSource.next(WebStorageUtil.get(Constants.CANETA_KEY));
    });
  }

  listar(): Promise<CanetaDto[]> {
    this.service.listar().then((canetas) => {
      WebStorageUtil.set(Constants.CANETA_KEY, canetas);
      this.canetasSource.next(canetas);
    }).catch((error) => {
      this.canetasSource.next(WebStorageUtil.get(Constants.CANETA_KEY));
    });
    return this.service.listar();
  }
  
  salvar(caneta: CanetaDto): void {
    this.service.salvar(caneta);
    this.service.listar().then((canetas) => {
      this.canetasSource.next(canetas);
      WebStorageUtil.set(Constants.CANETA_KEY, canetas);
    }).catch((error) => {
      this.canetasSource.next(WebStorageUtil.get(Constants.CANETA_KEY));
    });
  }

  remover(id: number): void {
    this.service.remover(id);
    this.service.listar().then((canetas) => {
      this.canetasSource.next(canetas);
      WebStorageUtil.set(Constants.CANETA_KEY, canetas);
    }).catch((error) => {
      this.canetasSource.next(WebStorageUtil.get(Constants.CANETA_KEY));
    });
  }
  
  asObservable(): Observable<CanetaDto[]> {
    return this.canetasSource.asObservable();
  }
}

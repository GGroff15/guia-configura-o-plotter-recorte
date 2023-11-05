import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LaminaDto } from 'src/app/model/lamina-dto';
import { LaminaService } from 'src/app/services/lamina.service';
import { Constants } from 'src/app/utils/constantes';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';

@Injectable({
  providedIn: 'root'
})
export class ListaLaminasService {
  
  private laminasSource = new Subject<LaminaDto[]>();

  constructor(private service: LaminaService) {
    this.service.listar().then((laminas) => {
      WebStorageUtil.set(Constants.LAMINA_KEY, laminas);
      this.laminasSource.next(laminas);
    }).catch((error) => {
      this.laminasSource.next(WebStorageUtil.get(Constants.LAMINA_KEY));
    });
  }

  listar(): Promise<LaminaDto[]> {
    this.service.listar().then((laminas) => {
      WebStorageUtil.set(Constants.LAMINA_KEY, laminas);
      this.laminasSource.next(laminas);
    }).catch((error) => {
      this.laminasSource.next(WebStorageUtil.get(Constants.LAMINA_KEY));
    });
    return this.service.listar();
  }
  
  salvar(caneta: LaminaDto): void {
    this.service.salvar(caneta);
    this.service.listar().then((laminas) => {
      this.laminasSource.next(laminas);
      WebStorageUtil.set(Constants.LAMINA_KEY, laminas);
    }).catch((error) => {
      this.laminasSource.next(WebStorageUtil.get(Constants.LAMINA_KEY));
    });
  }

  remover(id: number): void {
    this.service.remover(id);
    this.service.listar().then((laminas) => {
      this.laminasSource.next(laminas);
      WebStorageUtil.set(Constants.LAMINA_KEY, laminas);
    }).catch((error) => {
      this.laminasSource.next(WebStorageUtil.get(Constants.LAMINA_KEY));
    });
  }
  
  asObservable(): Observable<LaminaDto[]> {
    return this.laminasSource.asObservable();
  }
}

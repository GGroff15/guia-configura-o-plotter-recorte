import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TapeteDto } from 'src/app/model/tapete-dto';
import { TapetesService } from 'src/app/services/tapete.service';
import { Constants } from 'src/app/utils/constantes';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';

@Injectable({
  providedIn: 'root'
})
export class ListaTapetesService {
  
  private tapetesSource = new Subject<TapeteDto[]>();

  constructor(private service: TapetesService) {
    this.service.listar().then((tapetes) => {
      WebStorageUtil.set(Constants.TAPETE_KEY, tapetes);
      this.tapetesSource.next(tapetes);
    }).catch((error) => {
      this.tapetesSource.next(WebStorageUtil.get(Constants.TAPETE_KEY));
    });
  }

  listar(): Promise<TapeteDto[]> {
    this.service.listar().then((tapetes) => {
      WebStorageUtil.set(Constants.TAPETE_KEY, tapetes);
      this.tapetesSource.next(tapetes);
    }).catch((error) => {
      this.tapetesSource.next(WebStorageUtil.get(Constants.TAPETE_KEY));
    });
    return this.service.listar();
  }
  
  salvar(processo: TapeteDto): void {
    this.service.salvar(processo);
    this.service.listar().then((tapetes) => {
      this.tapetesSource.next(tapetes);
      WebStorageUtil.set(Constants.TAPETE_KEY, tapetes);
    }).catch((error) => {
      this.tapetesSource.next(WebStorageUtil.get(Constants.TAPETE_KEY));
    });
  }

  remover(id: number): void {
    this.service.remover(id);
    this.service.listar().then((tapetes) => {
      this.tapetesSource.next(tapetes);
      WebStorageUtil.set(Constants.TAPETE_KEY, tapetes);
    }).catch((error) => {
      this.tapetesSource.next(WebStorageUtil.get(Constants.TAPETE_KEY));
    });
  }
  
  asObservable() {
    return this.tapetesSource.asObservable();
  }
}

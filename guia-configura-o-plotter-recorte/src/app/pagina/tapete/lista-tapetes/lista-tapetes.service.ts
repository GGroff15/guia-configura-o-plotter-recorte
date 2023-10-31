import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TapeteDto } from 'src/app/model/tapete-dto';
import { TapetesService } from 'src/app/services/tapete.service';

@Injectable({
  providedIn: 'root'
})
export class ListaTapetesService {
  
  private tapetes;

  constructor(private service: TapetesService) {
    this.tapetes = new BehaviorSubject<TapeteDto[]>(this.service.listar());
  }
  
  getListaTapetes() {
    return this.tapetes.asObservable();
  }
}
